(() => {
  const AUTH_USERS_KEY = "wabe_user_accounts";
  const AUTH_SESSION_KEY = "wabe_user_session";
  const safeStorageParse = (key, fallback) => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  };
  const getStoredUsers = () => safeStorageParse(AUTH_USERS_KEY, []);
  const getAuthSession = () => safeStorageParse(AUTH_SESSION_KEY, null);
  const isUserLoggedIn = () => Boolean(getAuthSession()?.email);

  window.WABE_AUTH = {
    usersKey: AUTH_USERS_KEY,
    sessionKey: AUTH_SESSION_KEY,
    getUsers: getStoredUsers,
    getSession: getAuthSession,
    isLoggedIn: isUserLoggedIn,
  };

  const getPageContext = () => {
    const script =
      document.querySelector('script[src$="assets/js/site.js"]') ||
      document.querySelector('script[src$="../assets/js/site.js"]');
    const scriptSrc = script?.getAttribute("src") || "assets/js/site.js";
    const basePrefix = scriptSrc.replace(/assets\/js\/site\.js$/, "") || "./";
    const pathname = (window.location.pathname || "").toLowerCase();
    const filename = pathname.split(/[\\/]/).pop() || "index.html";
    const isHomePage =
      filename === "index.html" || pathname === "" || pathname.endsWith("/");
    const inJournalSection =
      /[\\/]journal[\\/]/.test(pathname) || /[\\/]journal-categories[\\/]/.test(pathname);
    const inLegalSection = /[\\/]legal[\\/]/.test(pathname);

    let navCurrent = "";
    if (isHomePage) {
      navCurrent = "home";
    } else if (filename === "about.html") {
      navCurrent = "about";
    } else if (filename === "contact-us.html") {
      navCurrent = "contact";
    } else if (filename === "collections.html") {
      navCurrent = "collections";
    } else if (filename === "journal.html" || inJournalSection) {
      navCurrent = "journal";
    } else if (filename === "shop.html" || filename === "shop-02.html") {
      navCurrent = "shop";
    }

    return {
      basePrefix,
      filename,
      navCurrent,
      legalCurrent: inLegalSection ? filename : "",
      legalPrefix: inLegalSection ? "./" : `${basePrefix}legal/`,
    };
  };

  const buildPageHref = (basePrefix, target) => `${basePrefix}${target}`;
  const buildLegalHref = (context, target) => `${context.legalPrefix}${target}`;
  const buildCurrentAttrs = (isCurrent) =>
    isCurrent ? ' aria-current="page" class="navigation-link inline-block is-current"' : ' class="navigation-link inline-block"';
  const buildFooterCurrentAttrs = (isCurrent) =>
    isCurrent ? ' aria-current="page" class="footer-link inline-block is-current"' : ' class="footer-link inline-block"';

  const buildGuestAccountMarkup = (basePrefix) => `
          <a
            aria-label="Login or register"
            class="navigation-link inline-block profile-login-link"
            href="${buildPageHref(basePrefix, "login.html")}"
          >
            <span class="profile-login-icon" aria-hidden="true">
              <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"></path>
                <path d="M4 21C4 17.6863 7.58172 15 12 15C16.4183 15 20 17.6863 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"></path>
              </svg>
            </span>
          </a>
  `;

  const buildLoggedInUserMarkup = (basePrefix) => `
          <a
            aria-label="Logout"
            class="navigation-link inline-block profile-login-link"
            href="#"
            onclick="window.localStorage.removeItem('wabe_user_session'); window.location.href='${buildPageHref(basePrefix, "login.html")}'; return false;"
          >
            <span class="profile-login-icon" aria-hidden="true">
              <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"></path>
                <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"></path>
                <path d="M21 12H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"></path>
              </svg>
            </span>
          </a>
  `;

  const buildCartMarkup = (basePrefix) => `
          <div class="shop-cartwrapper cart" data-open-product="">
            <a
              aria-haspopup="dialog"
              aria-label="Open cart"
              class="shop-cartopenlink navigation-link inline-block"
              href="#"
              role="button"
              ><div class="inline-block">Bag</div>
              <div class="shop-cartopenlinkcount cart-quantity">0</div></a
            >
            <div
              class="shop-cartcontainerwrapper shop-cartcontainerwrapper--cartType-rightSidebar cart-container"
              style="display: none"
            >
              <div class="shop-cartcontainer cart-content" role="dialog">
                <div class="shop-cartheader cart-header">
                  <h6 class="shop-cartheading">YOUR BAG</h6>
                  <a
                    aria-label="Close cart"
                    class="shop-cartcloselink close inline-block"
                    role="button"
                    ><img
                      alt=""
                      class="close-image"
                      loading="lazy"
                      src="${basePrefix}assets/media/6a2680f03f3745a0ac723d17_Close_icon.svg"
                  /></a>
                </div>
                <div class="shop-cartformwrapper">
                  <form class="shop-cartform" style="display: none">
                    <div class="shop-cartlist list">
                      <div class="shop-cartitem cart-item">
                        <div class="product-image-container">
                          <img
                            alt=""
                            class="shop-cartitemimage image is-empty"
                            src=""
                          />
                        </div>
                        <div class="shop-cartiteminfo cart-text">
                          <div class="block">
                            <div class="shop-cartproductname is-empty"></div>
                            <div>$ 0.00 USD</div>
                            <ul class="shop-cartoptionlist">
                              <li>
                                <span class="is-empty"></span><span>: </span
                                ><span class="is-empty"></span>
                              </li>
                            </ul>
                            <a
                              aria-label="Remove item from cart"
                              class="inline-block"
                              href="#"
                              role="button"
                              ><div>Remove</div></a
                            >
                          </div>
                          <input
                            aria-label="Update quantity"
                            autocomplete="off"
                            class="shop-cartquantity cart-quantity-text"
                            inputmode="numeric"
                            name="quantity"
                            pattern="^[0-9]+$"
                            required=""
                            type="number"
                            value="1"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="shop-cartfooter cart-footer">
                      <div
                        aria-atomic="true"
                        aria-live="polite"
                        class="shop-cartlineitem"
                      >
                        <div>Subtotal</div>
                        <div class="shop-cartordervalue"></div>
                      </div>
                      <div>
                        <div style="display: none">
                          <a
                            aria-haspopup="dialog"
                            aria-label="Apple Pay"
                            class="shop-cartapplepaybutton"
                            role="button"
                            style="
                              background-image: -webkit-named-image(
                                apple-pay-logo-white
                              );
                              background-size: 100% 50%;
                              background-position: 50% 50%;
                              background-repeat: no-repeat;
                            "
                            tabindex="0"
                            ><div></div
                          ></a>
                          <a
                            aria-haspopup="dialog"
                            class="shop-cartquickcheckoutbutton"
                            role="button"
                            style="display: none"
                            tabindex="0"
                            ><svg
                              class="shop-quickcheckoutgoogleicon"
                              height="16"
                              viewbox="0 0 16 16"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                            >
                              <defs>
                                <polygon
                                  id="google-mark-a"
                                  points="0 .329 3.494 .329 3.494 7.649 0 7.649"
                                ></polygon>
                                <polygon
                                  id="google-mark-c"
                                  points=".894 0 13.169 0 13.169 6.443 .894 6.443"
                                ></polygon>
                              </defs>
                              <g fill="none" fill-rule="evenodd">
                                <path
                                  d="M10.5967,12.0469 L10.5967,14.0649 L13.1167,14.0649 C14.6047,12.6759 15.4577,10.6209 15.4577,8.1779 C15.4577,7.6339 15.4137,7.0889 15.3257,6.5559 L7.8887,6.5559 L7.8887,9.6329 L12.1507,9.6329 C11.9767,10.6119 11.4147,11.4899 10.5967,12.0469"
                                  fill="#4285F4"
                                ></path>
                                <path
                                  d="M7.8887,16 C10.0137,16 11.8107,15.289 13.1147,14.067 C13.1147,14.066 13.1157,14.065 13.1167,14.064 L10.5967,12.047 C10.5877,12.053 10.5807,12.061 10.5727,12.067 C9.8607,12.556 8.9507,12.833 7.8887,12.833 C5.8577,12.833 4.1387,11.457 3.4937,9.605 L0.8747,9.605 L0.8747,11.648 C2.2197,14.319 4.9287,16 7.8887,16"
                                  fill="#34A853"
                                ></path>
                                <g transform="translate(0 4)">
                                  <mask fill="#fff" id="google-mark-b">
                                    <use xlink:href="#google-mark-a"></use>
                                  </mask>
                                  <path
                                    d="M3.4639,5.5337 C3.1369,4.5477 C3.1359,3.4727 3.4609,2.4757 L3.4639,2.4777 C3.4679,2.4657 3.4749,2.4547 3.4789,2.4427 L3.4939,0.3287 L0.8939,0.3287 C0.8799,0.3577 0.8599,0.3827 0.8459,0.4117 C-0.2821,2.6667 -0.2821,5.3337 0.8459,7.5887 L0.8459,7.5997 C0.8549,7.6167 0.8659,7.6317 0.8749,7.6487 L3.4939,5.6057 C3.4849,5.5807 3.4729,5.5587 3.4639,5.5337"
                                    fill="#FBBC04"
                                    mask="url(#google-mark-b)"
                                  ></path>
                                </g>
                                <mask fill="#fff" id="google-mark-d">
                                  <use xlink:href="#google-mark-c"></use>
                                </mask>
                                <path
                                  d="M0.894,4.3291 L3.478,6.4431 C4.113,4.5611 5.843,3.1671 7.889,3.1671 C9.018,3.1451 10.102,3.5781 10.912,4.3671 L13.169,2.0781 C11.733,0.7231 9.85,-0.0219 7.889,0.0001 C4.941,0.0001 2.245,1.6791 0.894,4.3291"
                                  fill="#EA4335"
                                  mask="url(#google-mark-d)"
                                ></path>
                              </g></svg
                            ><svg
                              class="shop-quickcheckoutmicrosofticon"
                              height="16"
                              viewbox="0 0 16 16"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g fill="none" fill-rule="evenodd">
                                <polygon
                                  fill="#F05022"
                                  points="7 7 1 7 1 1 7 1"
                                ></polygon>
                                <polygon
                                  fill="#7DB902"
                                  points="15 7 9 7 9 1 15 1"
                                ></polygon>
                                <polygon
                                  fill="#00A4EE"
                                  points="7 15 1 15 1 9 7 9"
                                ></polygon>
                                <polygon
                                  fill="#FFB700"
                                  points="15 15 9 15 9 9 15 9"
                                ></polygon>
                              </g>
                            </svg>
                            <div>Pay with browser.</div></a
                          >
                        </div>
                        <a
                          class="shop-cartcheckoutbutton add-to-cart-button"
                          data-loading-text="Hang Tight..."
                          href="${buildPageHref(basePrefix, "purchasing-plan.html")}"
                          value="Checkout"
                          >Checkout</a
                        >
                      </div>
                    </div>
                  </form>
                  <div class="shop-cartemptystate">
                    <div aria-label="This bag is empty" aria-live="polite">
                      Your bag is empty.
                    </div>
                  </div>
                  <div
                    aria-live="assertive"
                    class="shop-carterrorstate"
                    style="display: none"
                  >
                    <div class="cart-error-message">
                      Product is not available in this quantity.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;

  const buildHeaderActionMarkup = (basePrefix) =>
    isUserLoggedIn() ? `${buildCartMarkup(basePrefix)}\n${buildLoggedInUserMarkup(basePrefix)}` : `${buildCartMarkup(basePrefix)}\n${buildGuestAccountMarkup(basePrefix)}`;

  const buildNavigationLinks = (context) => {
    const links = [
      {
        current: context.navCurrent === "shop",
        href: buildPageHref(context.basePrefix, "shop.html"),
        label: "Shop",
      },
    ];

    links.push(
      {
        current: context.navCurrent === "collections",
        href: buildPageHref(context.basePrefix, "collections.html"),
        label: "Collections",
      },
      {
        current: context.navCurrent === "about",
        href: buildPageHref(context.basePrefix, "about.html"),
        label: "About",
      },
      {
        current: context.navCurrent === "contact",
        href: buildPageHref(context.basePrefix, "contact-us.html"),
        label: "Contact Us",
      }
    );

    return links
      .map(
        (link) =>
          `<a${buildCurrentAttrs(link.current)} href="${link.href}"><div>${link.label}</div></a>`
      )
      .join("");
  };

  const buildDesktopMenuMarkup = (context, menuId = "") => {
    const logoCurrent =
      context.navCurrent === "home"
        ? ' aria-current="page" class="menu-logo inline-block is-current"'
        : ' class="menu-logo inline-block"';
    const menuIdAttr = menuId ? ` id="${menuId}"` : "";

    return `
    <div class="menu"${menuIdAttr}>
      <a${logoCurrent} href="${buildPageHref(context.basePrefix, "index.html")}"><span class="brand-logo-text">Widhi Asih Bali Export</span></a>
      <div class="desktop-navigation">
        <div class="menu-navigation">
          ${buildNavigationLinks(context)}
${buildHeaderActionMarkup(context.basePrefix)}
        </div>
      </div>
      <a class="mobile-menu-icon inline-block" href="#"
        ><img
          alt=""
          class="burger"
          loading="lazy"
          src="${context.basePrefix}assets/media/6a2680f03f3745a0ac723d2b_Menu.svg" /><img
          alt=""
          class="close-menu"
          loading="lazy"
          src="${context.basePrefix}assets/media/6a2680f03f3745a0ac723d2c_close.svg"
      /></a>
    </div>`;
  };

  const buildMobileMenuMarkup = (context) => `
    <div class="mobile-menu-wrapper">
      <div class="mobile-menu-container">
        <div class="menu-navigation">
          ${buildNavigationLinks(context)}
${buildHeaderActionMarkup(context.basePrefix)}
        </div>
      </div>
    </div>`;

  const buildFooterLink = (context, file, label) =>
    `<a class="footer-link inline-block"${buildFooterCurrentAttrs(
      context.legalCurrent === file
    )} href="${buildLegalHref(context, file)}"><div>${label}</div></a>`;

  const buildFooterMarkup = (context) => `
    <section class="footer">
      <div class="footer-grid">
        <div class="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a785190-6a78518e">
          <div class="block">
            <h6>FUND&nbsp;US</h6>
            ${buildFooterLink(context, "privacy-and-cookies.html", "800 Hammersmith Street, Melbourne, VIC 3000")}
          </div>
          <div class="block">
            <h6>OPEN</h6>
            <div>MON-SAT &mdash; 10:00AM - 6:00PM<br />SUNDAYS &mdash; 12:00PM - 5:00PM</div>
          </div>
          <div class="block">
            <h6>CONTACT</h6>
            ${buildFooterLink(context, "privacy-and-cookies.html", "+61 234 567 89")}${buildFooterLink(
      context,
      "privacy-and-cookies.html",
      "help@widhiasihbaliexport.com"
    )}
          </div>
          <div class="block">
            <h6>PRESS</h6>
            ${buildFooterLink(context, "privacy-and-cookies.html", "press@widhiasihbaliexport.com")}
          </div>
        </div>
        <div class="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a7851ad-6a78518e">
          <div class="block">
            ${buildFooterLink(context, "privacy-and-cookies.html", "Privacy and Cookies")}${buildFooterLink(
      context,
      "returns-and-exchanges.html",
      "Returns and Exchanges"
    )}${buildFooterLink(context, "shipping-and-handling.html", "Shipping and Handling")}${buildFooterLink(
      context,
      "terms-and-conditions.html",
      "Terms and Conditions"
    )}
          </div>
        </div>
        <div class="footer-item">
          <h6>Sign up to our newsletter<br/>Never miss an update:</h6>
          <div class="subsribe w-form">
            <form class="subscribe-block" data-name="Email Form" id="email-form" method="get" name="email-form">
              <input class="text-field w-input" data-name="Email 2" id="email-2" maxlength="256" name="email-2" placeholder="Enter your Email" required="" type="email"/>
              <input class="submit-button w-button" data-wait="Please wait..." type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
      <div class="space _96px"></div>
      <div class="footer-grid">
        <div class="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a7851d9-6a78518e">
          <a class="menu-logo inline-block" href="${buildPageHref(context.basePrefix, "index.html")}"><span class="brand-logo-text">Widhi Asih Bali Export</span></a>
        </div>
        <div class="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a7851dc-6a78518e">
          <div class="block">
            <a class="footer-link inline-block" href="#"><div>Instagram</div></a><a class="footer-link inline-block" href="#"><div>YouTube</div></a><a class="footer-link inline-block" href="#"><div>TikTok</div></a><a class="footer-link inline-block" href="#"><div>Facebook</div></a><a class="footer-link inline-block" href="#"><div>Twitter</div></a>
          </div>
        </div>
      </div>
    </section>`;

  const renderSharedLayouts = () => {
    const context = getPageContext();

    document.querySelectorAll("[data-shared-layout]").forEach((node) => {
      const kind = node.getAttribute("data-shared-layout");

      if (kind === "desktop-menu") {
        node.outerHTML = buildDesktopMenuMarkup(
          context,
          node.getAttribute("data-menu-id") || ""
        );
        return;
      }

      if (kind === "mobile-menu") {
        node.outerHTML = buildMobileMenuMarkup(context);
        return;
      }

      if (kind === "footer") {
        node.outerHTML = buildFooterMarkup(context);
      }
    });
  };

  renderSharedLayouts();
})();

document.addEventListener("DOMContentLoaded", () => {
  try {
  const COUNTRY_DATA = `
AF|Afghanistan
AX|Aland Islands
AL|Albania
DZ|Algeria
AS|American Samoa
AD|Andorra
AO|Angola
AI|Anguilla
AG|Antigua and Barbuda
AR|Argentina
AM|Armenia
AW|Aruba
AU|Australia
AT|Austria
AZ|Azerbaijan
BS|Bahamas
BH|Bahrain
BD|Bangladesh
BB|Barbados
BY|Belarus
BE|Belgium
BZ|Belize
BJ|Benin
BM|Bermuda
BT|Bhutan
BO|Bolivia
BQ|Bonaire, Saint Eustatius and Saba
BA|Bosnia and Herzegovina
BW|Botswana
BR|Brazil
IO|British Indian Ocean Territory
VG|British Virgin Islands
BN|Brunei
BG|Bulgaria
BF|Burkina Faso
BI|Burundi
CV|Cabo Verde
KH|Cambodia
CM|Cameroon
CA|Canada
KY|Cayman Islands
CF|Central African Republic
TD|Chad
CL|Chile
CN|China
CX|Christmas Island
CC|Cocos Islands
CO|Colombia
KM|Comoros
CK|Cook Islands
CR|Costa Rica
HR|Croatia
CU|Cuba
CW|Curacao
CY|Cyprus
CZ|Czechia
CD|Democratic Republic of the Congo
DK|Denmark
DJ|Djibouti
DM|Dominica
DO|Dominican Republic
EC|Ecuador
EG|Egypt
SV|El Salvador
GQ|Equatorial Guinea
ER|Eritrea
EE|Estonia
SZ|Eswatini
ET|Ethiopia
FK|Falkland Islands
FO|Faroe Islands
FJ|Fiji
FI|Finland
FR|France
GF|French Guiana
PF|French Polynesia
TF|French Southern Territories
GA|Gabon
GM|Gambia
GE|Georgia
DE|Germany
GH|Ghana
GI|Gibraltar
GR|Greece
GL|Greenland
GD|Grenada
GP|Guadeloupe
GU|Guam
GT|Guatemala
GG|Guernsey
GN|Guinea
GW|Guinea-Bissau
GY|Guyana
HT|Haiti
HN|Honduras
HK|Hong Kong
HU|Hungary
IS|Iceland
IN|India
ID|Indonesia
IR|Iran
IQ|Iraq
IE|Ireland
IM|Isle of Man
IL|Israel
IT|Italy
CI|Ivory Coast
JM|Jamaica
JP|Japan
JE|Jersey
JO|Jordan
KZ|Kazakhstan
KE|Kenya
KI|Kiribati
XK|Kosovo
KW|Kuwait
KG|Kyrgyzstan
LA|Laos
LV|Latvia
LB|Lebanon
LS|Lesotho
LR|Liberia
LY|Libya
LI|Liechtenstein
LT|Lithuania
LU|Luxembourg
MO|Macao
MG|Madagascar
MW|Malawi
MY|Malaysia
MV|Maldives
ML|Mali
MT|Malta
MH|Marshall Islands
MQ|Martinique
MR|Mauritania
MU|Mauritius
YT|Mayotte
MX|Mexico
FM|Micronesia
MD|Moldova
MC|Monaco
MN|Mongolia
ME|Montenegro
MS|Montserrat
MA|Morocco
MZ|Mozambique
MM|Myanmar
NA|Namibia
NR|Nauru
NP|Nepal
NL|Netherlands
NC|New Caledonia
NZ|New Zealand
NI|Nicaragua
NE|Niger
NG|Nigeria
NU|Niue
NF|Norfolk Island
KP|North Korea
MK|North Macedonia
MP|Northern Mariana Islands
NO|Norway
OM|Oman
PK|Pakistan
PW|Palau
PS|Palestinian Territory
PA|Panama
PG|Papua New Guinea
PY|Paraguay
PE|Peru
PH|Philippines
PN|Pitcairn
PL|Poland
PT|Portugal
PR|Puerto Rico
QA|Qatar
CG|Republic of the Congo
RE|Reunion
RO|Romania
RU|Russia
RW|Rwanda
BL|Saint Barthelemy
SH|Saint Helena
KN|Saint Kitts and Nevis
LC|Saint Lucia
MF|Saint Martin
PM|Saint Pierre and Miquelon
VC|Saint Vincent and the Grenadines
WS|Samoa
SM|San Marino
ST|Sao Tome and Principe
SA|Saudi Arabia
SN|Senegal
RS|Serbia
SC|Seychelles
SL|Sierra Leone
SG|Singapore
SX|Sint Maarten
SK|Slovakia
SI|Slovenia
SB|Solomon Islands
SO|Somalia
ZA|South Africa
GS|South Georgia and the South Sandwich Islands
KR|South Korea
SS|South Sudan
ES|Spain
LK|Sri Lanka
SD|Sudan
SR|Suriname
SJ|Svalbard and Jan Mayen
SE|Sweden
CH|Switzerland
SY|Syria
TW|Taiwan
TJ|Tajikistan
TZ|Tanzania
TH|Thailand
TL|Timor Leste
TG|Togo
TK|Tokelau
TO|Tonga
TT|Trinidad and Tobago
TN|Tunisia
TR|Turkey
TM|Turkmenistan
TC|Turks and Caicos Islands
TV|Tuvalu
VI|U.S. Virgin Islands
UG|Uganda
UA|Ukraine
AE|United Arab Emirates
GB|United Kingdom
US|United States
UM|United States Minor Outlying Islands
UY|Uruguay
UZ|Uzbekistan
VU|Vanuatu
VA|Vatican
VE|Venezuela
VN|Vietnam
WF|Wallis and Futuna
EH|Western Sahara
YE|Yemen
ZM|Zambia
ZW|Zimbabwe
`
    .trim()
    .split("\n")
    .map((line) => {
      const [value, label] = line.split("|");
      return { value, label };
    });

  const CART_KEY = "wabe_cart";

  const formatCurrency = (value) => `$ ${value.toFixed(2)} USD`;

  const normalizeText = (text) => String(text || "").replace(/\s+/g, " ").trim();

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const parsePrice = (text) => {
    const match = String(text).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
    return match ? Number.parseFloat(match[1]) : 0;
  };

  const slugify = (text) =>
    normalizeText(text)
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const SHOP_CATALOGS = [
    "ALBAZIA 2025",
    "BAMBOO 2025",
    "CAPIZ 2025",
    "COCONUT 2025",
    "DRIFTWOOD 2025",
    "GLASS",
    "HANGING",
    "INSTRUMENT",
    "RATTAN 2025",
    "SHELL 2025",
    "STONE 2025",
    "TASSEL 2025",
    "TEAK 2025",
    "TERRACOTTA 2025",
    "WATERHYACINTH&SEAGRASS 2025",
  ].map((name) => ({ name, slug: slugify(name) }));

  const PRODUCT_CATALOG_MAP = {
    "Whimsy Candle Holder": "TERRACOTTA 2025",
    "Eclipse Coffee Cup": "GLASS",
    "Harmony Dinner Plate": "STONE 2025",
    "Aurora Tea Mug": "BAMBOO 2025",
    "Celestial Serving Platter": "CAPIZ 2025",
    "Cascade Water Pitcher": "DRIFTWOOD 2025",
    "Nebula Salad Bowl": "COCONUT 2025",
    "Meadow Dessert Plate": "SHELL 2025",
    "Serenity Soup Bowl": "RATTAN 2025",
    "Eden Flower Vase": "TEAK 2025",
  };

  const COLLECTION_IMAGE_POOL = [
    "assets/media/6a2680f03f3745a0ac723d9e_Catergoy_image_placeholder_01.jpg",
    "assets/media/6a2680f03f3745a0ac723d9f_Catergoy_image_placeholder_04.jpg",
    "assets/media/6a2680f03f3745a0ac723da0_Catergoy_image_placeholder_05.jpg",
    "assets/media/6a2680f03f3745a0ac723da1_Catergoy_image_placeholder_02.jpg",
    "assets/media/6a2680f03f3745a0ac723da2_Catergoy_image_placeholder_06.jpg",
    "assets/media/6a2680f03f3745a0ac723da3_Catergoy_image_placeholder_03.jpg",
  ];

  const COLLECTION_LINK_LABELS = [
    "Shop The Range",
    "Explore Collection",
    "Shop Now",
    "Discover Collection",
  ];

  const findCatalogByName = (name) =>
    SHOP_CATALOGS.find((catalog) => catalog.name === normalizeText(name)) || null;

  const findCatalogBySlug = (slug) =>
    SHOP_CATALOGS.find((catalog) => catalog.slug === normalizeText(slug)) || null;

  const getMappedCatalogName = (productName) =>
    PRODUCT_CATALOG_MAP[normalizeText(productName)] || "";

  const getAvailableShopCatalogs = () => {
    const mappedCatalogs = new Set(
      Object.values(PRODUCT_CATALOG_MAP)
        .map((name) => normalizeText(name))
        .filter(Boolean)
    );

    return SHOP_CATALOGS.filter((catalog) => mappedCatalogs.has(catalog.name));
  };

  const applyMappedCatalogLabels = () => {
    document.querySelectorAll(".product-wrapper-item").forEach((card) => {
      const title = normalizeText(
        card.querySelector(".product-text div")?.textContent || ""
      );
      const catalogName = getMappedCatalogName(title);
      const catalog = findCatalogByName(catalogName);

      if (!catalog) return;

      card.dataset.catalog = catalog.name;
      card.dataset.catalogSlug = catalog.slug;
      card.dataset.searchText = `${title} ${catalog.name}`.toLowerCase();

      const categoryHeading = card.querySelector(".brand-link h6");
      if (categoryHeading) {
        categoryHeading.textContent = catalog.name;
      }
    });

    const productTitle = normalizeText(document.querySelector(".section.product h1")?.textContent);
    const mappedProductCatalog = findCatalogByName(getMappedCatalogName(productTitle));
    if (mappedProductCatalog) {
      document.querySelectorAll(".category-item h3").forEach((heading) => {
        heading.textContent = mappedProductCatalog.name;
      });
    }
  };

  const initLinkedProductCards = () => {
    const shouldPreserveNativeNavigation = (event) => {
      if (!event) return false;
      if ("button" in event && event.button !== 0) return true;
      return Boolean(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
    };

    const navigateToProductHref = (event, href) => {
      if (!href || event.defaultPrevented || shouldPreserveNativeNavigation(event)) return;
      window.location.href = href;
    };

    document.querySelectorAll(".product-wrapper-item").forEach((card) => {
      if (!card.dataset.productHref) {
        const primaryProductLink = card.querySelector(".product-item[href]");
        const productHref = primaryProductLink?.getAttribute("href");
        if (productHref) {
          card.dataset.productHref = productHref;
        }
      }

      if (!card.dataset.productHref || card.dataset.linkCardBound === "true") return;

      card.dataset.linkCardBound = "true";
      card.classList.add("is-linked-product-card");
      card.setAttribute("role", card.getAttribute("role") || "link");

      if (!card.hasAttribute("tabindex")) {
        card.tabIndex = 0;
      }

      card
        .querySelectorAll(".product-item[href] .image-container, .product-item[href] .product-image")
        .forEach((node) => {
          if (node.dataset.productImageLinkBound === "true") return;
          node.dataset.productImageLinkBound = "true";
          node.addEventListener("click", (event) => {
            navigateToProductHref(event, card.dataset.productHref);
          });
        });

      card.addEventListener("click", (event) => {
        if (event.defaultPrevented) return;
        if (event.target.closest("a, button, input, select, textarea, label")) return;
        navigateToProductHref(event, card.dataset.productHref);
      });

      card.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        if (event.target.closest("a, button, input, select, textarea, label")) return;

        event.preventDefault();
        window.location.href = card.dataset.productHref;
      });
    });
  };

  const buildCatalogLinkMarkup = (catalog) =>
    `<a class="shop-catalog-link inline-block" href="./shop.html?catalog=${encodeURIComponent(
      catalog.slug
    )}" data-catalog="${escapeHtml(catalog.slug)}"><h6>${escapeHtml(
      catalog.name
    )}</h6></a>`;

  const renderDrawerCatalogFilters = () => {
    const filterList = document.querySelector(".laundry-list-wrapper.collection-items");
    if (!filterList) return;

    const pathname = (window.location.pathname || "").toLowerCase();
    const isShopV1Page = pathname.endsWith("shop.html");
    const catalogs = isShopV1Page ? getAvailableShopCatalogs() : SHOP_CATALOGS;

    const filterHeading = document.querySelector(".filter-title h6");
    if (filterHeading) {
      filterHeading.textContent = "Filter by Catalog";
    }

    filterList.classList.add("catalog-filter-list");
    filterList.innerHTML = catalogs.map(
      (catalog) => `
        <div class="laundry-list-item collection-item" role="listitem">
          <a class="filter-list inline-block" href="./shop.html?catalog=${encodeURIComponent(
            catalog.slug
          )}" data-catalog="${escapeHtml(catalog.slug)}"><h6>${escapeHtml(
            catalog.name
          )}</h6></a>
        </div>
      `
    ).join("");
  };

  const initFilterDrawer = () => {
    const filterButton = document.querySelector(".section.first .filter");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const closeButton = modal?.querySelector(".close")?.closest("a");
    const dropdown = modal?.querySelector("[data-filter-dropdown]");
    const dropdownToggle = modal?.querySelector("[data-filter-dropdown-toggle]");
    const dropdownPanel = modal?.querySelector("[data-filter-dropdown-panel]");
    const dropdownIcon = modal?.querySelector(".filter-dropdown-icon");

    if (!filterButton || !modal || !overlay) return;

    const openDrawer = () => {
      overlay.style.display = "block";
      modal.style.display = "flex";
      modal.style.transform = "translate3d(0, 0, 0)";
      modal.style.webkitTransform = "translate3d(0, 0, 0)";
      modal.style.mozTransform = "translate3d(0, 0, 0)";
      modal.style.msTransform = "translate3d(0, 0, 0)";
      document.body.classList.add("cart-open");
    };

    const closeDrawer = () => {
      overlay.style.display = "none";
      modal.style.display = "none";
      modal.style.transform = "translate3d(100%, 0, 0)";
      modal.style.webkitTransform = "translate3d(100%, 0, 0)";
      modal.style.mozTransform = "translate3d(100%, 0, 0)";
      modal.style.msTransform = "translate3d(100%, 0, 0)";
      document.body.classList.remove("cart-open");
    };

    const setDropdownState = (isOpen) => {
      if (!dropdown || !dropdownPanel || !dropdownToggle) return;
      dropdown.classList.toggle("is-open", isOpen);
      dropdownPanel.style.display = isOpen ? "block" : "none";
      dropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (dropdownIcon) {
        dropdownIcon.textContent = isOpen ? "-" : "+";
      }
    };

    filterButton.addEventListener("click", (event) => {
      event.preventDefault();
      openDrawer();
    });

    overlay.addEventListener("click", closeDrawer);
    closeButton?.addEventListener("click", (event) => {
      event.preventDefault();
      closeDrawer();
    });

    if (dropdownToggle) {
      dropdownToggle.addEventListener("click", () => {
        const isOpen = dropdown?.classList.contains("is-open");
        setDropdownState(!isOpen);
      });
    }

    modal.querySelectorAll("[data-catalog]").forEach((link) => {
      link.addEventListener("click", () => {
        setDropdownState(true);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.style.display !== "none") {
        closeDrawer();
      }
    });

    setDropdownState(false);
  };

  const renderCollectionsCatalog = () => {
    const collectionGrid = document.querySelector(".feature-collection ._2-column.collection-items");
    if (!collectionGrid) return;

    const pathname = window.location.pathname || "";
    const isIndexPage =
      pathname.endsWith("index.html") || pathname.endsWith("/") || pathname === "";
    const isCollectionsPage = pathname.endsWith("collections.html");
    const paginationSection = document.querySelector("[data-collections-pagination-section]");
    const paginationContainer = document.querySelector("[data-collections-pagination]");
    const pageSize = 6;
    const url = new URL(window.location.href);
    const totalPages = Math.max(1, Math.ceil(SHOP_CATALOGS.length / pageSize));
    const requestedPage = Number.parseInt(url.searchParams.get("page") || "1", 10);
    const currentPage =
      Number.isFinite(requestedPage) && requestedPage > 0
        ? Math.min(requestedPage, totalPages)
        : 1;
    const pageOffset = (currentPage - 1) * pageSize;
    const catalogsToRender = isIndexPage
      ? SHOP_CATALOGS.slice(0, 2)
      : isCollectionsPage
      ? SHOP_CATALOGS.slice(pageOffset, pageOffset + pageSize)
      : SHOP_CATALOGS;

    collectionGrid.innerHTML = catalogsToRender.map((catalog, index) => {
      const renderIndex = isCollectionsPage ? pageOffset + index : index;
      const image = COLLECTION_IMAGE_POOL[renderIndex % COLLECTION_IMAGE_POOL.length];
      const cta = COLLECTION_LINK_LABELS[renderIndex % COLLECTION_LINK_LABELS.length];

      return `
        <div class="feature-item collection-item" role="listitem">
          <a class="feature-item-link inline-block" href="./shop.html?catalog=${encodeURIComponent(
            catalog.slug
          )}">
            <img
              alt="${escapeHtml(catalog.name)}"
              class="feature-collection-item"
              loading="lazy"
              src="${escapeHtml(image)}"
            />
            <div class="feature-item-block" style="color: hsla(0, 0%, 100%, 1)">
              <h1>${escapeHtml(catalog.name)}</h1>
              <div class="text-link" style="border-color: hsla(0, 0%, 100%, 1)">
                ${escapeHtml(cta)}
              </div>
            </div>
          </a>
        </div>
      `;
    }).join("");

    if (paginationSection && paginationContainer) {
      if (isCollectionsPage && totalPages > 1) {
        paginationSection.classList.add("is-visible");
        paginationContainer.innerHTML = Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === currentPage;

          return `
            <button
              class="collections-page-button${isActive ? " is-active" : ""}"
              data-collections-page="${pageNumber}"
              type="button"
            >
              ${pageNumber}
            </button>
          `;
        }).join("");

        paginationContainer.querySelectorAll("[data-collections-page]").forEach((button) => {
          button.addEventListener("click", () => {
            const nextPage = button.getAttribute("data-collections-page") || "1";
            const nextUrl = new URL(window.location.href);
            nextUrl.searchParams.set("page", nextPage);
            window.history.replaceState({}, "", nextUrl);
            renderCollectionsCatalog();
          });
        });
      } else {
        paginationSection.classList.remove("is-visible");
        paginationContainer.innerHTML = "";
      }
    }

    const description = document.getElementById(
      "layout-node-c3196c43-ab9c-6a82-1c08-343d75a44ea6-ac723d5e"
    );
    if (description) {
      description.textContent =
        "Browse the 2025 material catalog, from natural fibers and woodwork to glass, stone, shell, and terracotta. Each collection now routes directly into the shop so buyers can search and filter by the same catalog structure.";
    }
  };

  const initShopSearchAndFilters = () => {
    const searchForm = document.querySelector(".section.first .search");
    const searchInput = searchForm?.querySelector('input[type="search"]');
    const selectedFilters = document.querySelector("[data-selected-filters]");
    const paginationSection = document.querySelector("[data-shop-pagination-section]");
    const paginationContainer = document.querySelector("[data-shop-pagination]");
    const productGrid =
      document.querySelector("[data-shop-v1-grid]") ||
      document.querySelector(".large-product-grid.collection-items");
    const productCards = productGrid
      ? Array.from(productGrid.querySelectorAll(".product-wrapper-item"))
      : [];
    const pageSize = 15;
    const minimumPageCount = 3;
    const wideCardIndexes = new Set([2, 4, 6, 8, 10, 12]);

    if (!searchForm || !searchInput || !productCards.length) return;

    const seedCards = [...productCards];
    const targetProductCount = Math.max(pageSize * minimumPageCount, seedCards.length);

    while (productCards.length < targetProductCount) {
      const sourceCard = seedCards[productCards.length % seedCards.length];
      if (!sourceCard) break;

      const clone = sourceCard.cloneNode(true);
      productGrid?.appendChild(clone);
      productCards.push(clone);
    }

    productCards.forEach((card, index) => {
      card.classList.toggle("is-wide", wideCardIndexes.has(index % pageSize));

      if (!card.dataset.searchText) {
        card.dataset.searchText = card.textContent.toLowerCase();
      }
    });

    initLinkedProductCards();

    const availableCatalogSlugs = new Set(
      productCards.map((card) => card.dataset.catalogSlug).filter(Boolean)
    );

    const emptyState = document.createElement("div");
    emptyState.className = "shop-search-empty";
    emptyState.textContent = "No products match your search.";
    productGrid.parentElement?.appendChild(emptyState);

    const url = new URL(window.location.href);
    const initialCatalogs = Array.from(
      new Set(
        [
          ...url.searchParams.getAll("catalog"),
          ...(url.searchParams.get("catalogs") || "").split(","),
        ]
          .map((value) => findCatalogBySlug(value)?.slug || "")
          .filter((value) => availableCatalogSlugs.has(value))
          .filter(Boolean)
      )
    );
    let activeCatalogs = initialCatalogs;
    searchInput.value = url.searchParams.get("search") || "";
    const requestedPage = Number.parseInt(url.searchParams.get("page") || "1", 10);
    let currentPage =
      Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const syncUrl = () => {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete("catalog");
      nextUrl.searchParams.delete("catalogs");
      activeCatalogs.forEach((catalog) => {
        nextUrl.searchParams.append("catalog", catalog);
      });

      const term = normalizeText(searchInput.value);
      if (term) {
        nextUrl.searchParams.set("search", term);
      } else {
        nextUrl.searchParams.delete("search");
      }

      nextUrl.searchParams.delete("page");
      if (currentPage > 1) {
        nextUrl.searchParams.set("page", String(currentPage));
      }

      window.history.replaceState({}, "", nextUrl);
    };

    const updateActiveCatalogUi = () => {
      document.querySelectorAll("[data-catalog]").forEach((link) => {
        link.classList.toggle(
          "is-active",
          activeCatalogs.includes(link.getAttribute("data-catalog") || "")
        );
      });
    };

    const renderSelectedFilters = () => {
      if (!selectedFilters) return;

      if (!activeCatalogs.length) {
        selectedFilters.innerHTML = "";
        selectedFilters.classList.remove("is-visible");
        return;
      }

      selectedFilters.classList.add("is-visible");
      selectedFilters.innerHTML = `
        ${activeCatalogs
          .map((slug) => {
            const catalog = findCatalogBySlug(slug);
            if (!catalog) return "";

            return `
              <button class="shop-selected-filter-chip" data-remove-catalog="${escapeHtml(
                slug
              )}" type="button">
                <span>${escapeHtml(catalog.name)}</span>
                <span aria-hidden="true">x</span>
              </button>
            `;
          })
          .join("")}
        <button class="shop-selected-filter-clear" data-clear-filters type="button">
          Clear
        </button>
      `;
    };

    const renderPagination = (filteredCards) => {
      const totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));
      currentPage = Math.min(currentPage, totalPages);

      filteredCards.forEach((card, index) => {
        const pageIndex = Math.floor(index / pageSize) + 1;
        card.hidden = pageIndex !== currentPage;
      });

      if (!paginationSection || !paginationContainer) {
        return filteredCards.length ? Math.min(pageSize, filteredCards.length) : 0;
      }

      if (filteredCards.length && totalPages > 1) {
        paginationSection.classList.add("is-visible");
        paginationContainer.innerHTML = Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === currentPage;

          return `
            <button
              class="collections-page-button${isActive ? " is-active" : ""}"
              data-shop-page="${pageNumber}"
              type="button"
            >
              ${pageNumber}
            </button>
          `;
        }).join("");

        paginationContainer.querySelectorAll("[data-shop-page]").forEach((button) => {
          button.addEventListener("click", () => {
            const nextPage = Number.parseInt(
              button.getAttribute("data-shop-page") || "1",
              10
            );
            currentPage = Number.isFinite(nextPage) && nextPage > 0 ? nextPage : 1;
            applyFilters();
          });
        });
      } else {
        paginationSection.classList.remove("is-visible");
        paginationContainer.innerHTML = "";
      }

      return filteredCards.filter((card) => !card.hidden).length;
    };

    const applyFilters = ({ resetPage = false } = {}) => {
      if (resetPage) currentPage = 1;

      const term = normalizeText(searchInput.value).toLowerCase();
      const filteredCards = [];

      productCards.forEach((card) => {
        const text = card.dataset.searchText || card.textContent.toLowerCase();
        const matchesCatalog =
          !activeCatalogs.length || activeCatalogs.includes(card.dataset.catalogSlug);
        const matchesSearch = !term || text.includes(term);
        const isVisible = matchesCatalog && matchesSearch;
        card.classList.toggle("is-filtered-out", !isVisible);
        card.hidden = !isVisible;
        if (isVisible) filteredCards.push(card);
      });

      const visibleCount = renderPagination(filteredCards);

      productGrid.dataset.visibleCount = String(visibleCount);
      productGrid.classList.toggle("has-single-visible", visibleCount === 1);
      emptyState.classList.toggle("is-visible", filteredCards.length === 0);
      renderSelectedFilters();
      updateActiveCatalogUi();
      syncUrl();
    };

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      applyFilters({ resetPage: true });
    });

    searchInput.addEventListener("input", () => {
      applyFilters({ resetPage: true });
    });

    document.querySelectorAll("[data-catalog]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const nextCatalog = link.getAttribute("data-catalog") || "";
        if (!availableCatalogSlugs.has(nextCatalog)) return;
        activeCatalogs = activeCatalogs.includes(nextCatalog)
          ? activeCatalogs.filter((catalog) => catalog !== nextCatalog)
          : [...activeCatalogs, nextCatalog];
        applyFilters({ resetPage: true });
      });
    });

    selectedFilters?.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-catalog]");
      if (removeButton) {
        const nextCatalog = removeButton.getAttribute("data-remove-catalog") || "";
        activeCatalogs = activeCatalogs.filter((catalog) => catalog !== nextCatalog);
        applyFilters({ resetPage: true });
        return;
      }

      const clearButton = event.target.closest("[data-clear-filters]");
      if (clearButton) {
        activeCatalogs = [];
        applyFilters({ resetPage: true });
      }
    });

    applyFilters();
  };

  const removeNotifySalesButtons = () => {
    document.querySelectorAll(".shop-cartcheckoutbutton").forEach((button) => {
      const label = normalizeText(button.textContent || button.getAttribute("value") || "");
      if (label.toLowerCase() !== "notify sales") return;

      const actionGroup = button.parentElement;
      button.remove();

      if (!actionGroup) return;

      const hasVisibleChildren = Array.from(actionGroup.children).some((child) => {
        const inlineDisplay = child.style?.display;
        return inlineDisplay !== "none" && !child.hidden;
      });

      if (!hasVisibleChildren) {
        actionGroup.remove();
      }
    });
  };

  const readCart = () => {
    try {
      const value = window.localStorage.getItem(CART_KEY);
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  };

  const writeCart = (items) => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    if (typeof window.syncPlanFromCart === "function") window.syncPlanFromCart();
  };

  const findPriceText = (form) => {
    const addToCart = form.closest(".add-to-cart");
    let sibling = addToCart ? addToCart.previousElementSibling : null;

    while (sibling) {
      if (sibling.classList.contains("product-text")) {
        const values = Array.from(sibling.children)
          .map((node) => node.textContent.trim())
          .filter((value) => value.includes("$"));
        if (values.length) return values[values.length - 1];
      }
      sibling = sibling.previousElementSibling;
    }

    const scope = form.closest(".block-sticky, .feature-product-wrapper, section");
    if (!scope) return "$ 0.00 USD";

    const candidates = Array.from(scope.querySelectorAll(".product-text"))
      .flatMap((node) =>
        Array.from(node.children).map((child) => child.textContent.trim())
      )
      .filter((value) => value.includes("$"));

    return candidates[candidates.length - 1] || "$ 0.00 USD";
  };

  const collectFormOptions = (form) =>
    Array.from(form.querySelectorAll("select")).map((select) => ({
      label:
        select.closest(".option")?.querySelector("label")?.textContent?.trim() ||
        select.options[0]?.textContent?.trim() ||
        "Option",
      value: select.options[select.selectedIndex]?.textContent?.trim() || "",
    }));

  const buildCartItem = (form) => {
    const section = form.closest("section");
    const title =
      section?.querySelector("h1")?.textContent?.trim() ||
      form.closest(".block-sticky, .feature-product-wrapper")?.querySelector("h1")
        ?.textContent?.trim() ||
      "Selected Item";
    const image =
      section?.querySelector(".product-images-item img, .product-item .product-image, .product-image")
        ?.getAttribute("src") || "";
    const priceText = findPriceText(form);
    const options = collectFormOptions(form);

    return {
      id: `${title}::${options.map((option) => option.value).join("|") || "default"}`,
      name: title,
      image,
      price: parsePrice(priceText),
      quantity: 1,
      options,
    };
  };

  const closeCart = (container) => {
    if (!container) return;
    container.setAttribute("aria-hidden", "true");
    container.style.display = "none";
    document.body.classList.remove("cart-open");
  };

  const openCart = (container) => {
    if (!container) return;
    container.setAttribute("aria-hidden", "false");
    container.style.display = "flex";
    document.body.classList.add("cart-open");
  };

  const populateCountrySelect = (select) => {
    if (!select || select.dataset.optionsLoaded === "true") return;

    const fragment = document.createDocumentFragment();

    COUNTRY_DATA.forEach(({ value, label }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      fragment.appendChild(option);
    });

    select.replaceChildren(fragment);
    select.dataset.optionsLoaded = "true";
  };

  const authApi = window.WABE_AUTH || {
    usersKey: "wabe_user_accounts",
    sessionKey: "wabe_user_session",
    getUsers: () => [],
    getSession: () => null,
    isLoggedIn: () => false,
  };

  const writeStoredUsers = (users) =>
    window.localStorage.setItem(authApi.usersKey, JSON.stringify(users));

  const writeAuthSession = (session) =>
    window.localStorage.setItem(authApi.sessionKey, JSON.stringify(session));

  const clearAuthSession = () => window.localStorage.removeItem(authApi.sessionKey);

  const getPostAuthRedirect = () => {
    const fallback = "./shop.html";
    const redirectValue = new URL(window.location.href).searchParams.get("redirect");
    if (!redirectValue) return fallback;
    if (/^(?:https?:)?\/\//i.test(redirectValue)) return fallback;
    if (redirectValue.startsWith("//")) return fallback;
    return redirectValue;
  };

  const initAuthPages = () => {
    const loginForm = document.querySelector("[data-auth-login-form]");
    const registerForm = document.querySelector("[data-auth-register-form]");
    const status = document.querySelector("[data-auth-status]");
    const accountPanel = document.querySelector("[data-auth-account-panel]");
    const accountEmail = document.querySelector("[data-auth-account-email]");
    const logoutButton = document.querySelector("[data-auth-logout]");
    const testLoginButton = document.querySelector("[data-auth-test-login]");
    const signedIn = authApi.getSession();

    const setStatus = (message, kind = "") => {
      if (!status) return;
      status.textContent = message;
      status.className = `auth-status${kind ? ` is-${kind}` : ""}`;
    };

    if (accountPanel) {
      if (signedIn?.email) {
        accountPanel.hidden = false;
        if (accountEmail) {
          accountEmail.textContent = signedIn.email;
        }
      } else {
        accountPanel.hidden = true;
      }
    }

    document.querySelectorAll("[data-password-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-password-target") || "";
        const input = document.getElementById(targetId);
        if (!input) return;

        const shouldShow = input.getAttribute("type") === "password";
        input.setAttribute("type", shouldShow ? "text" : "password");
        button.setAttribute(
          "aria-label",
          shouldShow ? "Hide password" : "Show password"
        );
      });
    });

    logoutButton?.addEventListener("click", () => {
      clearAuthSession();
      window.location.href = "./login.html";
    });

    testLoginButton?.addEventListener("click", () => {
      writeAuthSession({
        name: "Test User",
        email: "test-user@widhiasihbaliexport.com",
        phone: "",
        company: "",
      });
      setStatus("Test login successful. Redirecting...", "success");
      window.location.href = getPostAuthRedirect();
    });

    loginForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = normalizeText(formData.get("email")).toLowerCase();
      const password = String(formData.get("password") || "");
      const user = authApi
        .getUsers()
        .find((entry) => normalizeText(entry.email).toLowerCase() === email);

      if (!user || user.password !== password) {
        setStatus("Email or password is incorrect.", "error");
        return;
      }

      writeAuthSession({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        company: user.company || "",
      });
      setStatus("Login successful. Redirecting...", "success");
      window.location.href = getPostAuthRedirect();
    });

    registerForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const name = normalizeText(formData.get("name"));
      const email = normalizeText(formData.get("email")).toLowerCase();
      const phone = normalizeText(formData.get("phone"));
      const company = normalizeText(formData.get("company"));
      const password = String(formData.get("password") || "");
      const confirmPassword = String(formData.get("confirm_password") || "");
      const users = authApi.getUsers();

      if (!name || !email || !phone || !password) {
        setStatus("Please complete all required fields.", "error");
        return;
      }

      if (password.length < 6) {
        setStatus("Password must be at least 6 characters.", "error");
        return;
      }

      if (password !== confirmPassword) {
        setStatus("Password confirmation does not match.", "error");
        return;
      }

      const emailExists = users.some(
        (entry) => normalizeText(entry.email).toLowerCase() === email
      );

      if (emailExists) {
        setStatus("An account with that email already exists.", "error");
        return;
      }

      const nextUser = { name, email, phone, company, password };
      writeStoredUsers([...users, nextUser]);
      writeAuthSession({ name, email, phone, company });
      setStatus("Registration successful. Redirecting...", "success");
      window.location.href = getPostAuthRedirect();
    });
  };

  applyMappedCatalogLabels();
  initLinkedProductCards();
  initAuthPages();
  renderDrawerCatalogFilters();
  renderCollectionsCatalog();
  removeNotifySalesButtons();
  initShopSearchAndFilters();
  initFilterDrawer();

  const renderCart = () => {
    const items = readCart();
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.querySelectorAll(".cart-quantity").forEach((node) => {
      node.textContent = String(totalQuantity);
    });

    document.querySelectorAll(".cart").forEach((cart) => {
      const form = cart.querySelector(".shop-cartform");
      const list = cart.querySelector(".shop-cartlist");
      const emptyState = cart.querySelector(".shop-cartemptystate");
      const subtotalValue = cart.querySelector(".shop-cartordervalue");

      if (!form || !list || !emptyState || !subtotalValue) return;

      if (!items.length) {
        form.style.display = "none";
        emptyState.style.display = "block";
        subtotalValue.textContent = formatCurrency(0);
        return;
      }

      list.innerHTML = items
        .map(
          (item) => `
            <div class="shop-cartitem cart-item" data-cart-id="${escapeHtml(item.id)}">
              <div class="product-image-container">
                <img alt="${escapeHtml(item.name)}" class="shop-cartitemimage image" src="${escapeHtml(item.image)}" />
              </div>
              <div class="shop-cartiteminfo cart-text">
                <div class="block">
                  <div class="shop-cartproductname">${escapeHtml(item.name)}</div>
                  <div>${escapeHtml(formatCurrency(item.price))}</div>
                  <ul class="shop-cartoptionlist">
                    ${item.options
                      .filter((option) => option.value)
                      .map(
                        (option) =>
                          `<li><span>${escapeHtml(option.label)}</span><span>: </span><span>${escapeHtml(option.value)}</span></li>`
                      )
                      .join("")}
                  </ul>
                  <a aria-label="Remove item from cart" class="inline-block" href="#" role="button" data-cart-remove="${escapeHtml(item.id)}"><div>Remove</div></a>
                </div>
                <input aria-label="Update quantity" autocomplete="off" class="shop-cartquantity cart-quantity-text" data-cart-quantity="${escapeHtml(item.id)}" inputmode="numeric" min="1" name="quantity" pattern="^[0-9]+$" required="" type="number" value="${item.quantity}" />
              </div>
            </div>
          `
        )
        .join("");

      form.style.display = "block";
      emptyState.style.display = "none";
      subtotalValue.textContent = formatCurrency(subtotal);
    });
  };

  const addToCart = (item) => {
    const items = readCart();
    const existingItem = items.find((entry) => entry.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    writeCart(items);
    renderCart();
  };

  const updateCartQuantity = (id, quantity) => {
    const items = readCart()
      .map((item) => (item.id === id ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);
    writeCart(items);
    renderCart();
  };

  const removeCartItem = (id) => {
    const items = readCart().filter((item) => item.id !== id);
    writeCart(items);
    renderCart();
  };

  document.querySelectorAll(".cart").forEach((cart) => {
    const openButton = cart.querySelector(".shop-cartopenlink");
    const container = cart.querySelector(".cart-container");
    const closeButton = cart.querySelector(".shop-cartcloselink");

    if (!container) return;
    closeCart(container);

    openButton?.addEventListener("click", (event) => {
      event.preventDefault();
      openCart(container);
    });

    closeButton?.addEventListener("click", (event) => {
      event.preventDefault();
      closeCart(container);
    });

    container.addEventListener("click", (event) => {
      if (event.target === container) {
        closeCart(container);
      }
    });

    container.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-cart-remove]");
      if (!removeButton) return;
      event.preventDefault();
      removeCartItem(removeButton.dataset.cartRemove);
    });

    container.addEventListener("change", (event) => {
      const quantityInput = event.target.closest("[data-cart-quantity]");
      if (!quantityInput) return;
      const quantity = Number.parseInt(quantityInput.value, 10);
      updateCartQuantity(
        quantityInput.dataset.cartQuantity,
        Number.isNaN(quantity) || quantity < 1 ? 1 : quantity
      );
    });
  });

  document.querySelectorAll(".shop-addtocartform").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      addToCart(buildCartItem(form));
      const cartContainer = document.querySelector(".cart-container");
      openCart(cartContainer);
    });
  });

  document.querySelectorAll(
    "#site-ecom-shipping-country, #site-ecom-billing-country"
  ).forEach(populateCountrySelect);

  const PLAN_KEY = "wabe_purchasing_plan";
  const PLAN_CONFIG_KEY = "wabe_purchasing_plan_config";
  const PLAN_NOTE_KEY = "wabe_purchasing_plan_crm_note";
  const PLAN_PAYLOAD_KEY = "wabe_purchasing_plan_crm_payload";
  let planCards = Array.from(document.querySelectorAll(".b2b-plan-card"));
  const selectedList = document.querySelector("[data-plan-selected-list]");
  const selectedCount = document.querySelector("[data-plan-count]");
  const noteForm = document.querySelector("[data-plan-note-form]");
  const crmNoteField = document.querySelector("[data-plan-crm-note]");
  const crmStatus = document.querySelector("[data-plan-crm-status]");

  if (planCards.length && selectedList && selectedCount) {
    const planGrid = document.querySelector(".b2b-plan-grid.purchasing-plan-selection");
    const savedState = (() => {
      try {
        return JSON.parse(window.localStorage.getItem(PLAN_KEY) || "{}");
      } catch {
        return {};
      }
    })();
    const savedConfig = (() => {
      try {
        return JSON.parse(window.localStorage.getItem(PLAN_CONFIG_KEY) || "{}");
      } catch {
        return {};
      }
    })();
    const savedNote = window.localStorage.getItem(PLAN_NOTE_KEY) || "";
    const defaultPlanCatalog = new Map(
      planCards.map((card) => {
        const title = normalizeText(card.querySelector("h3")?.textContent);
        return [
          title,
          {
            category: normalizeText(card.querySelector("h6")?.textContent) || "From Bag",
            link: card.querySelector(".b2b-plan-link")?.getAttribute("href") || "#",
            image: card.querySelector(".b2b-plan-image")?.getAttribute("src") || "",
            description: normalizeText(card.querySelector("p")?.textContent) || "Selected from bag.",
            size: normalizeText(card.querySelector("[data-plan-size]")?.textContent) || "-",
            color: normalizeText(card.querySelector("[data-plan-color]")?.textContent) || "-",
            detail: normalizeText(card.querySelector("[data-plan-detail]")?.textContent) || "Product selected from your bag.",
          },
        ];
      })
    );

    if (crmNoteField) {
      crmNoteField.value = savedNote;
    }

    const setCrmStatus = (message) => {
      if (crmStatus) {
        crmStatus.textContent = message;
      }
    };

    const findOptionValue = (item, labels) => {
      const match = (item.options || []).find((entry) =>
        labels.includes(normalizeText(entry.label).toLowerCase())
      );
      return normalizeText(match?.value);
    };

    const getCatalogEntry = (item) => {
      const fallback = defaultPlanCatalog.get(normalizeText(item.name));
      return {
        category: fallback?.category || "From Bag",
        link: fallback?.link || "#",
        image: item.image || fallback?.image || "",
        description: fallback?.description || "Selected from your bag.",
        size: findOptionValue(item, ["size", "select size"]) || fallback?.size || "-",
        color:
          findOptionValue(item, ["color", "colour", "select color", "select colour"]) ||
          fallback?.color ||
          "-",
        detail: fallback?.detail || "Product selected from your bag.",
      };
    };

    const bindPlanCardInputs = (card) => {
      const checkbox = card.querySelector(".b2b-plan-checkbox");
      if (checkbox && checkbox.dataset.planBound !== "true") {
        if (typeof savedState[card.dataset.planId] === "boolean") {
          checkbox.checked = savedState[card.dataset.planId];
        }
        checkbox.addEventListener("change", syncPlan);
        checkbox.dataset.planBound = "true";
      }

      const quantityInput = card.querySelector("[data-plan-quantity]");
      if (quantityInput) {
        if (savedConfig[card.dataset.planId]?.quantity) {
          quantityInput.value = savedConfig[card.dataset.planId].quantity;
        }
        if (quantityInput.dataset.planBound !== "true") {
          quantityInput.addEventListener("input", syncPlan);
          quantityInput.addEventListener("change", syncPlan);
          quantityInput.dataset.planBound = "true";
        }
      }
    };

    const renderPlanGridFromCart = () => {
      if (!planGrid) return;
      const cartItems = readCart();
      if (!cartItems.length) {
        planCards = Array.from(planGrid.querySelectorAll(".b2b-plan-card"));
        planCards.forEach(bindPlanCardInputs);
        return;
      }

      planGrid.innerHTML = cartItems
        .map((item) => {
          const meta = getCatalogEntry(item);
          savedState[item.id] = typeof savedState[item.id] === "boolean" ? savedState[item.id] : true;
          savedConfig[item.id] = {
            quantity: savedConfig[item.id]?.quantity || String(item.quantity || 1),
          };
          return `
            <article class="b2b-plan-card is-selected" data-plan-id="${escapeHtml(item.id)}">
              <div class="b2b-plan-card-header">
                <div>
                  <h6>${escapeHtml(meta.category)}</h6>
                  <h3><a class="b2b-plan-link" href="${escapeHtml(meta.link)}">${escapeHtml(item.name)}</a></h3>
                </div>
                <label class="b2b-plan-toggle">
                  <input checked class="b2b-plan-checkbox" type="checkbox" />
                  <span>Included</span>
                </label>
              </div>
              <a class="b2b-plan-link" href="${escapeHtml(meta.link)}"><img alt="${escapeHtml(item.name)}" class="b2b-plan-image" loading="lazy" src="${escapeHtml(meta.image)}" /></a>
              <p class="truncate">${escapeHtml(meta.description)}</p>
              <div class="b2b-plan-meta">
                <div><span>Size</span><strong data-plan-size>${escapeHtml(meta.size)}</strong></div>
                <div><span>Color</span><strong data-plan-color>${escapeHtml(meta.color)}</strong></div>
                <div class="b2b-plan-meta-wide"><span>Product Details</span><strong data-plan-detail>${escapeHtml(meta.detail)}</strong></div>
                <div><span>Quantity</span><input class="input-control b2b-plan-quantity" data-plan-quantity min="1" step="1" type="number" value="${escapeHtml(savedConfig[item.id].quantity)}" /></div>
              </div>
            </article>
          `;
        })
        .join("");

      planCards = Array.from(planGrid.querySelectorAll(".b2b-plan-card"));
      planCards.forEach(bindPlanCardInputs);
    };

    const getCardData = (card) => {
      const id = card.dataset.planId || "";
      const quantityInput = card.querySelector("[data-plan-quantity]");
      const quantityValue = Number.parseInt(
        quantityInput?.value || savedConfig[id]?.quantity || "1",
        10
      );

      return {
        id,
        title: normalizeText(card.querySelector("h3")?.textContent) || "Product",
        size: card.querySelector("[data-plan-size]")?.textContent?.trim() || "-",
        color: card.querySelector("[data-plan-color]")?.textContent?.trim() || "-",
        detail: card.querySelector("[data-plan-detail]")?.textContent?.trim() || "",
        quantity: Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1,
      };
    };

    const syncPlan = () => {
      const selectedCards = planCards.filter((card) => {
        const checkbox = card.querySelector(".b2b-plan-checkbox");
        const isChecked = checkbox?.checked ?? false;
        card.classList.toggle("is-selected", isChecked);
        card.classList.toggle("is-excluded", !isChecked);
        return isChecked;
      });

      selectedCount.textContent = String(selectedCards.length);

      if (!selectedCards.length) {
        selectedList.innerHTML =
          '<div class="b2b-plan-selected-empty">No products currently included.</div>';
      } else {
        selectedList.innerHTML = selectedCards
          .map((card) => {
            const item = getCardData(card);
            return `
              <div class="b2b-plan-selected-item">
                <div class="b2b-plan-selected-copy">
                  <strong>${escapeHtml(item.title)}</strong>
                  <div class="b2b-plan-selected-spec">Size: ${escapeHtml(item.size)}</div>
                  <div class="b2b-plan-selected-spec">Color: ${escapeHtml(item.color)}</div>
                  <div class="b2b-plan-selected-spec">Product Details: ${escapeHtml(item.detail)}</div>
                  <label class="b2b-plan-selected-quantity-label">
                    <span>Quantity</span>
                    <input aria-label="Update plan quantity" class="input-control b2b-plan-selected-quantity" data-plan-summary-quantity="${escapeHtml(item.id)}" min="1" step="1" type="number" value="${escapeHtml(String(item.quantity))}" />
                  </label>
                </div>
                <div class="b2b-plan-selected-actions">
                  <button class="b2b-plan-remove" data-plan-remove="${escapeHtml(item.id)}" type="button">Remove</button>
                </div>
              </div>
            `;
          })
          .join("");
      }

      const state = {};
      const cartById = new Map(readCart().map((item) => [item.id, item]));

      selectedCards.forEach((card) => {
        const item = getCardData(card);
        const existing = cartById.get(item.id);
        savedConfig[item.id] = { quantity: String(item.quantity) };
        cartById.set(item.id, {
          id: item.id,
          name: item.title,
          image: card.querySelector(".b2b-plan-image")?.getAttribute("src") || existing?.image || "",
          price: existing?.price || 0,
          quantity: item.quantity,
          options: existing?.options || [],
        });
      });

      planCards.forEach((card) => {
        const id = card.dataset.planId || "";
        const checkbox = card.querySelector(".b2b-plan-checkbox");
        state[id] = checkbox?.checked ?? false;
        if (!state[id]) {
          cartById.delete(id);
        }
      });

      window.localStorage.setItem(CART_KEY, JSON.stringify(Array.from(cartById.values())));
      window.localStorage.setItem(PLAN_KEY, JSON.stringify(state));
      window.localStorage.setItem(PLAN_CONFIG_KEY, JSON.stringify(savedConfig));
      renderCart();

      const crmPayload = {
        note: crmNoteField?.value?.trim() || "",
        selectedItems: selectedCards.map(getCardData),
      };
      window.localStorage.setItem(PLAN_PAYLOAD_KEY, JSON.stringify(crmPayload));
      setCrmStatus("");

      selectedList.querySelectorAll("[data-plan-remove]").forEach((button) => {
        button.addEventListener("click", () => {
          const targetId = button.getAttribute("data-plan-remove");
          const targetCard = planCards.find((card) => card.dataset.planId === targetId);
          const checkbox = targetCard?.querySelector(".b2b-plan-checkbox");
          if (!checkbox) return;
          checkbox.checked = false;
          syncPlan();
        });
      });

      selectedList.querySelectorAll("[data-plan-summary-quantity]").forEach((input) => {
        const syncQuantity = () => {
          const targetId = input.getAttribute("data-plan-summary-quantity");
          const targetCard = planCards.find((card) => card.dataset.planId === targetId);
          const quantityInput = targetCard?.querySelector("[data-plan-quantity]");
          if (!quantityInput) return;
          const nextValue = Number.parseInt(input.value, 10);
          quantityInput.value =
            Number.isNaN(nextValue) || nextValue < 1 ? "1" : String(nextValue);
          syncPlan();
        };

        input.addEventListener("input", syncQuantity);
        input.addEventListener("change", syncQuantity);
      });
    };

    window.syncPlanFromCart = () => {
      renderPlanGridFromCart();
      syncPlan();
    };

    renderPlanGridFromCart();

    if (noteForm && crmNoteField) {
      noteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        syncPlan();
        const payload = (() => {
          try {
            return JSON.parse(window.localStorage.getItem(PLAN_PAYLOAD_KEY) || "{}");
          } catch {
            return {};
          }
        })();

        if (!payload.selectedItems?.length) {
          setCrmStatus("Select at least one product before submitting");
          return;
        }

        const submission = {
          submittedAt: new Date().toISOString(),
          submittedVia: "purchase-plan-ui",
          payload,
        };
        window.localStorage.setItem(
          "wabe_purchasing_plan_last_submission",
          JSON.stringify(submission)
        );
        setCrmStatus("Your data has been submitted");
      });

      crmNoteField.addEventListener("input", () => {
        window.localStorage.setItem(PLAN_NOTE_KEY, crmNoteField.value);
        syncPlan();
      });
    }

    syncPlan();
  }

  renderCart();

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document
      .querySelectorAll('.cart-container[aria-hidden="false"]')
      .forEach(closeCart);
  });
  } catch (error) {
    const errDiv = document.createElement("div");
    errDiv.style = "position:fixed; top:0; left:0; width:100%; z-index:999999; background:red; color:white; padding:20px; font-family:monospace;";
    errDiv.innerHTML = "JS ERROR: " + error.message + "<br><br>" + error.stack;
    document.body.appendChild(errDiv);
    console.error(error);
  }
});
