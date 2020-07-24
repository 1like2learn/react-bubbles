import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [ newColor, setNewColor ] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      updateColors(
        colors.map(color => {
          return color.id === colorToEdit.id?
            colorToEdit:
            color;
        })
      )
    })
    .catch(error => {
      console.log('error', error);
    })
  };
  const addColor = event => {
    event.preventDefault()
    axiosWithAuth()
    .post(`/api/colors`, newColor)
    .then(response => {
      updateColors([
        ...colors,
        newColor
      ])
      setNewColor(initialColor)
    })
    .catch(error => {
      console.log('error', error);
    })

  }
  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(response => {
      updateColors(colors.filter(filterColor => filterColor.id !== color.id))
      console.log("response", response)
    })
    .catch(error => {
      console.log('error', error);
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>color name:
          <input 
            name="name"
            value={newColor.color}
            onChange={event => {
              setNewColor({
                ...newColor,
                color: event.target.value
              })
            }}
          />
        </label>
        <label>hex code:
          <input 
            name="hex"
            value={newColor.code.hex}
              onChange={event => {
                setNewColor({
                  ...newColor,
                  code: {hex: event.target.value}
                })
            }}
          />
        </label>
        <div className="button-row">
          <button type="submit">add Color</button>
          <button onClick={event => {
            event.preventDefault()
            setNewColor(initialColor)
          }}>clear</button>
        </div>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
