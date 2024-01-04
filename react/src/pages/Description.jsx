import React from 'react'
import PageRoot from "../components/PageRoot";
import DescriptionArticles from './DescriptionArticles';

const Description = () => {
   return (
       <div>
          <PageRoot pageName={"Description"}/>
          <DescriptionArticles />
       </div>
   )
}
/*
title="Titre Code";
description="Description du code";
file="File title";
fileLine="File lines"
image="https://i.postimg.cc/vTbKCRxf/code.png"

const Description2 = () => {
   return (
      <div className="container">
        <fieldset>
          <legend className="title">{title}</legend>
          <div className="content">
            <div className="subContainer">
              <fieldset class="des">
                <legend>Description :</legend>
                <p>{description}</p>
              </fieldset>
              <p><strong>File:</strong> {file} |  
              <strong> Line:</strong>  {fileLine}</p>
            </div>
            <aside className="image">
              <img src={image} alt="Image" />
            </aside>
          </div>
        </fieldset>
      </div>
    );
}
*/

export default Description
