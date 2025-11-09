import { useEffect, useState } from "react";
import SEOGeoReport from "../components/SEOGeoReport";
import { decodeBase64JsonParam } from "../utils/decode";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encoded = urlParams.get("data");
    if (encoded) {
      const decoded = decodeBase64JsonParam(encoded);
      setData(decoded.pages || decoded); // handles either format
    }
  }, []);

  return (
    <div style={{ fontFamily: "Helvetica Neue", padding: 24 }}>
      <h1 style={{ textTransform: "uppercase" }}>SEO/GEO Optimization Review</h1>
      <SEOGeoReport data={data} />
    </div>
  );
}
