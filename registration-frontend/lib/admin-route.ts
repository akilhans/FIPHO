type AdminContext = {
  defaultRoute: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  publicSiteLabel: string;
  publicSiteHref: string;
  accentLabel: string;
};

export function getDefaultAdminRoute(hostname?: string) {
  void hostname;
  return "/admin";
}

export function getAdminContext(hostname?: string): AdminContext {
  void hostname;
  return {
    defaultRoute: "/admin",
    title: "FIPHO Control Panel",
    shortTitle: "FIPHO Admin",
    subtitle: "Manage registrations, content, media, and operational records from one workspace.",
    publicSiteLabel: "Open public site",
    publicSiteHref: "https://fipho.uz",
    accentLabel: "Operations",
  };
}
