import React, { useEffect, useState } from "react";
import styles from "./Appearnace.module.css";
import PhonePreview from '../../components/PhonePreview/PhonePreview';

import avatar from '../../assets/avatar.png'
import sprakImg from '../../assets/spark.png'
import { FaShoppingCart } from 'react-icons/fa';

// Icons
import { Share2, Menu, Grid, Columns, LayoutGrid } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../../components/AppContext";

const Appearance = () => {
  const [active, setActive] = useState('link');
  const [selectedLayout, setSelectedLayout] = useState("stack");
  const [selectedButtonStyle, setSelectedButtonStyle] = useState("fill1");
  const [buttonColor, setButtonColor] = useState("#ffffff");
  const [buttonFontColor, setButtonFontColor] = useState("#888888");
  // const [links, setLinks] = useState([])
  const { userRegisterData, links } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const redirectUrl = (id) => {
    window.open(`http://localhost:4000/api/links/redirect/${id}`, "_blank");
  };
  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);
  };

  const handleButtonStyleChange = (style) => {
    setSelectedButtonStyle(style);
  };

  // Helper function to get button style class based on selection
  const getButtonStyleClass = () => {
    const styleMap = {
      fill1: styles.fillButton1,
      fill2: styles.fillButton2,
      fill3: styles.fillButton3,
      outline1: styles.outlineButton1,
      outline2: styles.outlineButton2,
      outline3: styles.outlineButton3,
      hardShadow1: styles.hardShadowButton1,
      hardShadow2: styles.hardShadowButton2,
      hardShadow3: styles.hardShadowButton3,
      softShadow1: styles.softShadowButton1,
      softShadow2: styles.softShadowButton2,
      softShadow3: styles.softShadowButton3,
      special1: styles.specialButton1,
      special2: styles.specialButton2,
      special3: styles.specialButton3,
      special4: styles.specialButton4,
      special5: styles.specialButton5,
      special6: styles.specialButton6,
    };

    return styleMap[selectedButtonStyle] || "";
  };

  // useEffect(() => {
  //   const fetchLinks = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get("http://localhost:4000/api/links/getlinks", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setLinks(response.data);
  //       console.log(links);
  //     } catch (error) {
  //       console.error("Error fetching analytics data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchLinks();
  // }, []);

  // if (isLoading || !links) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={styles.container}>

      {/* Main Content */}
      <div className={styles.content}>

        {/* Phone Preview and Options */}
        <div className={styles.mainSection}>
          {/* phonepreview */}
          {/* <PhonePreview selectedLayout={selectedLayout} selectedButtonStyle={selectedButtonStyle} 
        getButtonStyleClass={getButtonStyleClass}
        buttonColor={buttonColor}
        buttonFontColor={buttonFontColor}
        /> */}
          {/* --------------------------------------------- */}

          <div className={styles.previewContainer}>

            <div className={styles.phoneFrame}>
              <div className={styles.phoneContent}>
                <div className={styles.profileSection}
                // style={{ backgroundColor: color }}
                >
                  <img
                    src={avatar}
                    alt="Profile"
                    className={styles.avatar}
                  />
                  <h3 className={styles.username}>{userRegisterData.username}</h3>
                  <p className={styles.bio}>{userRegisterData.bio}</p>
                </div>

                <div className={styles.linkShopBtn}>
                  <div
                    className={`${styles.linkBtn} ${active === 'link' ? styles.active : ''}`}
                    onClick={() => setActive('link')}
                  >
                    link
                  </div>
                  <div
                    className={`${styles.shopBtn} ${active === 'shop' ? styles.active : ''}`}
                    onClick={() => setActive('shop')}
                  >
                    Shop
                  </div>
                </div>

                <div className={`${styles.linksSection} ${styles[selectedLayout]} `}

                >
                  {links
                    .filter((link) => link.type === active)
                    .map((link, index) => (
                      <>
                        {active === 'link' ? (
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              redirectUrl(link._id)
                            }}
                            key={index}
                            className={`${styles.linkButton} ${styles[link.type]} ${styles.mediaLink} ${getButtonStyleClass()}`}
                            // style={{
                            //   backgroundColor:
                            //     selectedButtonStyle.startsWith("fill") ||
                            //       selectedButtonStyle.startsWith("special")
                            //       ? buttonColor
                            //       : "transparent",
                            //   color: buttonFontColor,
                            // }}
                            target="_blank"
                            rel="noopener noreferrer">
                            {link.title}
                          </a>
                        ) : (
                          <div className={styles.shopCard}>
                            <div className={styles.inner_shopcard}>
                              <img
                                src={link.shopUrl}
                                alt="image"
                                className={styles.productImage}
                              />
                              <p className={styles.productTitle}>{link.shopTitle}</p>
                              <button className={styles.buyButton}>
                                <FaShoppingCart className={styles.cartIcon} />
                                Buy Now
                              </button>
                            </div>
                          </div>

                        )}

                      </>
                    ))}
                </div>

                <div className={styles.footer}>
                  <div className={styles.getConnected}>
                    <button>Get Connected</button>
                  </div>
                  <div className={styles.sparkBranding}>
                    <img src={sprakImg} alt="" />
                    <span>SPARK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------------------- */}

          {/* Configuration Options */}
          <div className={styles.configOptions}>
            <div className={styles.optionSection}>
              <h2>Layout</h2>
              <div className={styles.layoutOptions}>
                <div
                  className={`${styles.layoutOption} ${selectedLayout === "stack" ? styles.selectedOption : ""
                    }`}
                  onClick={() => handleLayoutChange("stack")}
                >
                  <div className={styles.layoutIcon}>
                    <Menu size={24} />
                  </div>
                  <span>Stack</span>
                </div>
                <div
                  className={`${styles.layoutOption} ${selectedLayout === "grid" ? styles.selectedOption : ""
                    }`}
                  onClick={() => handleLayoutChange("grid")}
                >
                  <div className={styles.layoutIcon}>
                    <Grid size={24} />
                  </div>
                  <span>Grid</span>
                </div>
                <div
                  className={`${styles.layoutOption} ${selectedLayout === "carousel" ? styles.selectedOption : ""
                    }`}
                  onClick={() => handleLayoutChange("carousel")}
                >
                  <div className={styles.layoutIcon}>
                    <Columns size={24} />
                  </div>
                  <span>Carousel</span>
                </div>
              </div>
            </div>

            <div className={styles.optionSection}>
              <h2>Buttons</h2>

              <div className={styles.buttonStyleSection}>
                <h3>Fill</h3>
                <div className={styles.buttonOptions}>
                  <div
                    className={`${styles.buttonOption} ${styles.fillButton1} ${selectedButtonStyle === "fill1"
                      ? styles.selectedButtonStyle
                      : ""
                      }`}
                    onClick={() => handleButtonStyleChange("fill1")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.fillButton2} ${selectedButtonStyle === "fill2"
                      ? styles.selectedButtonStyle
                      : ""
                      }`}
                    onClick={() => handleButtonStyleChange("fill2")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.fillButton3} ${selectedButtonStyle === "fill3"
                      ? styles.selectedButtonStyle
                      : ""
                      }`}
                    onClick={() => handleButtonStyleChange("fill3")}
                  ></div>
                </div>
              </div>

              <div className={styles.buttonStyleSection}>
                <h3>Outline</h3>
                <div className={styles.buttonOptions}>
                  <div
                    className={`${styles.buttonOption} ${styles.outlineButton1
                      } ${selectedButtonStyle === "outline1"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("outline1")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.outlineButton2
                      } ${selectedButtonStyle === "outline2"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("outline2")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.outlineButton3
                      } ${selectedButtonStyle === "outline3"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("outline3")}
                  ></div>
                </div>
              </div>

              <div className={styles.buttonStyleSection}>
                <h3>Hard shadow</h3>
                <div className={styles.buttonOptions}>
                  <div
                    className={`${styles.buttonOption} ${styles.hardShadowButton1
                      } ${selectedButtonStyle === "hardShadow1"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("hardShadow1")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.hardShadowButton2
                      } ${selectedButtonStyle === "hardShadow2"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("hardShadow2")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.hardShadowButton3
                      } ${selectedButtonStyle === "hardShadow3"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("hardShadow3")}
                  ></div>
                </div>
              </div>

              <div className={styles.buttonStyleSection}>
                <h3>Soft shadow</h3>
                <div className={styles.buttonOptions}>
                  <div
                    className={`${styles.buttonOption} ${styles.softShadowButton1
                      } ${selectedButtonStyle === "softShadow1"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("softShadow1")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.softShadowButton2
                      } ${selectedButtonStyle === "softShadow2"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("softShadow2")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.softShadowButton3
                      } ${selectedButtonStyle === "softShadow3"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("softShadow3")}
                  ></div>
                </div>
              </div>

              <div className={styles.buttonStyleSection}>
                <h3>Special</h3>
                <div className={styles.buttonOptions}>
                  <div
                    className={`${styles.buttonOption} ${styles.specialButton1
                      } ${selectedButtonStyle === "special1"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("special1")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.specialButton2
                      } ${selectedButtonStyle === "special2"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("special2")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.specialButton3
                      } ${selectedButtonStyle === "special3"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("special3")}
                  ></div>
                </div>
                <div className={styles.buttonOptions}>
                  <div
                    className={`${styles.buttonOption} ${styles.specialButton4
                      } ${selectedButtonStyle === "special4"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("special4")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.specialButton5
                      } ${selectedButtonStyle === "special5"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("special5")}
                  ></div>
                  <div
                    className={`${styles.buttonOption} ${styles.specialButton6
                      } ${selectedButtonStyle === "special6"
                        ? styles.selectedButtonStyle
                        : ""
                      }`}
                    onClick={() => handleButtonStyleChange("special6")}
                  ></div>
                </div>
              </div>

              <div className={styles.colorSection}>
                <h3>Button color</h3>
                <div className={styles.colorPicker}>
                  <span>Button color</span>
                  <div className={styles.colorValue}>
                    <input
                      type="color"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className={styles.colorInput}
                    />
                    {buttonColor}
                  </div>
                </div>
              </div>

              <div className={styles.colorSection}>
                <h3>Button font color</h3>
                <div className={styles.colorPicker}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: buttonFontColor }}
                  ></div>
                  <div>
                    <span>Button font color</span>
                    <div className={styles.colorValue}>
                      <input
                        type="color"
                        value={buttonFontColor}
                        onChange={(e) => setButtonFontColor(e.target.value)}
                        className={styles.colorInput}
                      />
                      {buttonFontColor}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Appearance;