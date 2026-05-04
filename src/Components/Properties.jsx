import { useEffect, useState } from "react";
const T = {
  gold: "#C9A96E",
  goldLight: "#E8D5B0",
  goldDark: "#8B6914",
  obsidian: "#0A0A0A",
  charcoal: "#141414",
  smoke: "#1C1C1C",
  ivory: "#F5F0E8",
  ivoryDim: "rgba(245,240,232,0.55)",
  ivoryFaint: "rgba(245,240,232,0.35)",
  goldBorder: "rgba(201,169,110,0.2)",
  goldBorderHover: "rgba(201,169,110,0.5)",
  cormorant: "'Cormorant Garamond', Georgia, serif",
  montserrat: "'Montserrat', sans-serif",
};

export default function Properties() {
  const [allProperties, setAllProperties] = useState([
    {
      id: 1,
      uid: 1234,
      title: "Sky Residences, Downtown",
      type: "Penthouse",
      area: "Downtown Dubai",
      price: "AED 28,500,000",
      beds: 5,
      baths: 6,
      sqft: "7,200",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      tag: "Featured",
      views: "Burj Khalifa View",
    },
    {
      id: 2,
      uid: 1235,
      title: "Marina Pearl Tower",
      type: "Apartment",
      area: "Dubai Marina",
      price: "AED 4,200,000",
      beds: 3,
      baths: 3,
      sqft: "2,100",
      img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
      tag: "New",
      views: "Marina View",
    },
    {
      id: 3,
      uid: 1236,
      title: "Palm Shore Villa",
      type: "Villa",
      area: "Palm Jumeirah",
      price: "AED 52,000,000",
      beds: 7,
      baths: 8,
      sqft: "12,400",
      img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      tag: "Exclusive",
      views: "Sea Front",
    },
    {
      id: 4,
      uid: 1237,
      title: "Creek Harbour Loft",
      type: "Duplex",
      area: "Dubai Creek",
      price: "AED 7,800,000",
      beds: 4,
      baths: 4,
      sqft: "3,900",
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      tag: "Premium",
      views: "Creek View",
    },
    {
      id: 5,
      uid: 1238,
      title: "Business Bay Heights",
      type: "Apartment",
      area: "Business Bay",
      price: "AED 2,950,000",
      beds: 2,
      baths: 2,
      sqft: "1,450",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      tag: "New",
      views: "Canal View",
    },
    {
      id: 6,
      uid: 1239,
      title: "Emirates Hills Manor",
      type: "Villa",
      area: "Emirates Hills",
      price: "AED 85,000,000",
      beds: 9,
      baths: 10,
      sqft: "18,000",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      tag: "Ultra-Luxury",
      views: "Golf Course",
    },
  ]);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  //   function setInitialProperties() {
  //     return allProperties;
  //   }
  const [filter, setFilter] = useState("All");
  const types = ["All", "Apartment", "Villa", "Penthouse", "Duplex"];

  function updateFilter(typeOfFilter) {
    // console.log(typeOfFilter);
    setFilter(typeOfFilter);
  }
  useEffect(() => {
    function updateProperties() {
      if (filter === "All") {
        setFilteredProperties(allProperties);
      } else {
        const filteredData = allProperties.filter(
          (singleProperty) => singleProperty.type === filter,
        );
        console.log(filteredData);
        setFilteredProperties(filteredData);
        // console.log("executed");
        console.log(filter);
      }
    }
    updateProperties();
  }, [filter]);
  return (
    <section
      id="properties"
      style={{ background: T.obsidian, padding: "96px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div
          className="au-fade-up"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: T.montserrat,
                fontSize: 9,
                letterSpacing: ".3em",
                color: "#C9A96E",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Our Portfolio
            </div>
            <h2
              className="au-section-h2"
              style={{
                fontFamily: T.cormorant,
                fontSize: "4rem",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              <span style={{ color: T.ivory }}>Exceptional</span>
              <br />
              <span className="au-gold-text" style={{ fontStyle: "italic" }}>
                Residences
              </span>
            </h2>
          </div>
          <div
          //   style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            {types.map((type) => (
              <button
                key={type}
                className={`au-filter-btn ${filter === type ? "active" : ""}`}
                onClick={
                  () => updateFilter(type)
                  // setFilter(type)
                }
                style={{ borderRadius: 2 }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: 24,
          }}
        >
          {filteredProperties.map((p, i) => (
            <div
              key={p.uid}
              //   key={p.id}
              //   key={p.title}
              className="au-card au-fade-up"
              style={{ borderRadius: 3, transitionDelay: `${i * 70}ms` }}
            >
              <div style={{ overflow: "hidden", position: "relative" }}>
                <img src={p.img} alt={p.title} className="au-card-img" />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(0deg,rgba(0,0,0,.7) 0%,transparent 60%)",
                  }}
                />
                {/* Tag */}
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "linear-gradient(135deg,#8B6914,#C9A96E)",
                    color: "#0A0A0A",
                    fontFamily: T.montserrat,
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: ".15em",
                    padding: "5px 10px",
                    borderRadius: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {p.tag}
                </span>
                {/* View */}
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "rgba(0,0,0,.6)",
                    backdropFilter: "blur(8px)",
                    color: "#C9A96E",
                    fontFamily: T.montserrat,
                    fontSize: 9,
                    letterSpacing: ".1em",
                    padding: "5px 10px",
                    borderRadius: 2,
                  }}
                >
                  {p.views}
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 16,
                    fontFamily: T.montserrat,
                    fontSize: 9,
                    color: "rgba(255,255,255,.65)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}
                >
                  {p.area}
                </div>
              </div>

              <div style={{ padding: 24, position: "relative" }}>
                <div className="au-corner-tl" />
                <div
                  style={{
                    fontFamily: T.montserrat,
                    fontSize: 9,
                    color: "#C9A96E",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {p.type}
                </div>
                <div
                  style={{
                    fontFamily: T.cormorant,
                    fontSize: 20,
                    fontWeight: 500,
                    color: T.ivory,
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </div>
                <div
                  className="au-gold-text"
                  style={{
                    fontFamily: T.cormorant,
                    fontSize: 24,
                    fontWeight: 300,
                    marginBottom: 16,
                  }}
                >
                  {p.price}
                </div>
                <div
                  className="au-gold-line"
                  style={{ marginBottom: 16, opacity: 0.35 }}
                />
                <div style={{ display: "flex", gap: 20 }}>
                  {[
                    [p.beds, "Beds"],
                    [p.baths, "Baths"],
                    [p.sqft + " sqft", "Area"],
                  ].map(([v, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: T.montserrat,
                          fontSize: 13,
                          color: T.ivoryDim,
                          fontWeight: 500,
                        }}
                      >
                        {v}
                      </div>
                      <div
                        style={{
                          fontFamily: T.montserrat,
                          fontSize: 9,
                          color: "rgba(245,240,232,.35)",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="au-btn-outline"
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    marginTop: 20,
                    borderRadius: 2,
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ textAlign: "center", marginTop: 48 }}
          className="au-fade-up"
        >
          <button
            className="au-btn-outline"
            style={{ padding: "14px 48px", borderRadius: 2 }}
          >
            Explore All Properties
          </button>
        </div>
      </div>
    </section>
  );
}
