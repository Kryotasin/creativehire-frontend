require("babel-register")({
    presets: ["es2015", "react"]
  });

   
  const router = require("./guestRoute").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://www.creativehire.co")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();