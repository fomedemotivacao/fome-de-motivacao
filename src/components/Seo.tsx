import { Helmet } from "react-helmet-async";

const SITE_URL = "https://manualdoinsightaacao.com.br";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
  keywords?: string;
}

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

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
}: SeoProps) => {
  const canonical = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Manual do Insight à Ação" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Article */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && (
        <meta property="article:author" content="Manual do Insight à Ação" />
      )}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
