import siteData from "./data/site.json";
import type {
	AnalyticsConfig,
	ExpressiveCodeConfig,
	GiscusConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SeoConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: siteData.site.title,
	subtitle: siteData.site.subtitle,
	lang: siteData.site.lang as SiteConfig["lang"],
	themeColor: {
		hue: siteData.theme.hue,
		fixed: siteData.theme.fixed,
	},
	banner: {
		enable: true,
		src: siteData.theme.banner,
		position: siteData.theme.bannerPosition as "top" | "center" | "bottom",
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		{
			src: "/favicon/pg-avatar.webp",
			sizes: "64x64",
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "追番",
			url: "/anime/",
		},
		{
			name: "随记",
			url: "/notes/",
		},
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/aPG666a/fuwari",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: siteData.profile.avatar,
	name: siteData.profile.name,
	bio: siteData.profile.bio,
	links: siteData.profile.links,
};

export const seoConfig: SeoConfig = {
	description: siteData.site.description,
	defaultOgImage: siteData.seo.defaultOgImage,
	siteUrl: siteData.site.url,
};

export const giscusConfig: GiscusConfig = {
	...siteData.giscus,
	repo: siteData.giscus.repo as `${string}/${string}`,
};

export const analyticsConfig: AnalyticsConfig = siteData.analytics;

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
