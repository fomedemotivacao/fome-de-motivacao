import { Helmet } from "react-helmet-async";

const SITE_URL = "https://fomedemotivacao.com.br";
const SITE_NAME = "Fome de Motivação";
const TWITTER_HANDLE = "@fomedemotivacao";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const LOGO_URL = `${SITE_URL}/logo-publisher.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  keywords?: string;
  tags?: string[];
  section?: string;
  author?: string;
}

const Seo = ({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  image = DEFAULT_IMAGE,
  jsonLd,
  noindex,
  keywords,
  tags,
  section,
  author = SITE_NAME,
}: SeoProps) => {
  const canonical = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  // Suporte a múltiplos JSON-LD (array) ou único objeto
  const jsonLdScripts = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  // Schema Organization padrão injetado em todas as páginas
  const orgSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: LOGO_URL,
      width: 200,
      height: 60,
      caption: SITE_NAME,
    },
    sameAs: [
      "https://twitter.com/fomedemotivacao",
      "https://www.instagram.com/fomedemotivacao",
    ],
  };

  return (
    <Helmet>
      {/* ── Básico ── */}
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robotsContent} />
      <meta name="author" content={author} />
      <meta name="theme-color" content="#0f0e0c" />

      {/* ── Preconnect para performance ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />

      {/* ── Sitemap reference ── */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* ── Article ── */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      {type === "article" && (
        <meta property="article:author" content={author} />
      )}
      {type === "article" &&
        tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* ── Twitter / X ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* ── Organization Schema (global) ── */}
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>

      {/* ── JSON-LD (suporta array de schemas) ── */}
      {jsonLdScripts.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
