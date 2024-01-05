import React from 'react';
import './Skill.css';

function Skill({ title, description, file, fileLine, finalImage }) {
  return (
    <div className="container">
      <fieldset>
        <legend className="title">{title}</legend>
        <div className="content">
          <div className="subContainer">
            <fieldset className="des">
              <legend>Description :</legend>
              <p>{description}</p>
            </fieldset>
            <p><strong>File:</strong> {file}</p>  
            <p><strong> Line:</strong>  {fileLine}</p>
          </div>
          <aside className="aside">
            <img src={finalImage} alt="Image" className='image' />
          </aside>
        </div>
      </fieldset>
    </div>
  );
}

export default Skill;
