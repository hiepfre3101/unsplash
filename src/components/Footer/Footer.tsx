import LogoIcon from "../../assets/icons/LogoIcon";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={style["wrapper"]}>
         <div className={style["main"]}>
             <LogoIcon/>
             <span>Make something awesome</span>
         </div>
    </div>
  )
}

export default Footer