import { useState, useEffect } from "react";
import styles from "./SampleTest.module.css";

const SampleTest = () => {
  const predefinedColors = ["#3E3129", "#FFFFFF", "#000000"];
  const [selectedColor, setSelectedColor] = useState("#3E3129");

  // Save selected color to local storage (optional)
  useEffect(() => {
    const savedColor = localStorage.getItem("bannerColor");
    if (savedColor) setSelectedColor(savedColor);
  }, []);

  const handleColorChange = (color) => setSelectedColor(color);

  const handleSave = () => {
    localStorage.setItem("bannerColor", selectedColor);
    alert("Background color saved!");
  };

  return (
    <div className={styles.container}>
      <h3>Banner</h3>
      <div className={styles.banner} style={{ backgroundColor: selectedColor }}>
        <img className={styles.avatar} src="/avatar.png" alt="Profile" />
        <p className={styles.username}>@opopo_08</p>
        <p className={styles.subUsername}>🔥 /opopo_08</p>
      </div>

      <div className={styles.colorSection}>
        <p>Custom Background Color</p>
        <div className={styles.colors}>
          {predefinedColors.map((color) => (
            <div
              key={color}
              className={`${styles.colorCircle} ${selectedColor === color ? styles.active : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>

        <div className={styles.colorPicker}>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
          <input type="text" value={selectedColor} readOnly />
        </div>
      </div>

      <button className={styles.saveBtn} onClick={handleSave}>Save</button>
    </div>
  );
};

export default SampleTest;
