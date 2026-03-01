import React from "react";
import "./ListBox.css";
import Card from "./ListBox.jsx";
function ListSection() {
const stuff = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        title: "Protest in Park Bay",
        description: "Something happened we dont like it :(",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        title: "Drag Brunch",
        description: "Drag Kings and Queens come down for food",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        title: "Ducks",
        description: "Quack",
    },
];
 return (
    <div className="container">

      <div className="box-grid">
        {stuff.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
export default ListSection;