import classes from "../css/NotFound.module.css";
import { NavLink } from "react-router-dom";
function NotFound() {
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes["col-sm-12"]}>
          <div
            className={`${classes["col-sm-10"]} ${classes["col-sm-offset-1"]} ${classes["text-center"]}`}
          >
            <div className={classes["four_zero_four_bg"]}>
              <h1 className={classes["text-center"]}>404</h1>
            </div>

            <div className={classes["contant_box_404"]}>
              <h3 className={classes.h2}>Look like you're lost</h3>
              <p>the page you are looking for not avaible!</p>
              <NavLink to="/" className={classes["link_404"]}>
                Go to Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
