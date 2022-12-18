import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import "./CategoryItem.css";

const CategoryItem = ({ item, className, setShow, setDataModal}) => {
  const handleClickCard = () => {
    setDataModal(item.id ? item : {});
    setShow(true);
  };
  return (
    <div className={className} onClick={() => handleClickCard()} style={{width: "fit-content", padding: "0"}}>
      <Card className="text-center custom-card" style={{ margin: "10px" }}>
        <Card.Img src={item?.image_review} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>{item?.name}</Card.Title>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default CategoryItem;
