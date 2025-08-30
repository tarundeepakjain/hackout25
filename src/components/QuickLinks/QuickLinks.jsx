import React from 'react';
import './QuickLinks.css';

const QuickLinks = () => {
  const links = [
    {
      url: "https://globalmangrovewatch.org",
      icon: "🌍",
      title: "Global Mangrove Watch",
      description: "Monitor mangrove forests worldwide"
    },
    {
      url: "https://www.mangroveactionproject.org",
      icon: "🌱",
      title: "Mangrove Action Project",
      description: "Conservation and restoration efforts"
    },
    {
      url: "https://www.iucnredlist.org",
      icon: "🐾",
      title: "Species Conservation",
      description: "Mangrove biodiversity protection"
    }
  ];

  return (
    <div className="card">
      <h3>🔗 Learn More About Mangroves</h3>
      <div className="quick-links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <div className="link-icon">{link.icon}</div>
            <div className="link-content">
              <h4>{link.title}</h4>
              <p>{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
