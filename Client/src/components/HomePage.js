import music from "../assets/music.jpg";
import classes from "../css/HomePage.module.css";
function HomePage() {
  return (
    <div className={classes["image-overlay"]}>
      <img className={classes.image} src={music} />
      <div className={classes["text-overlay"]}>
        <h1>What you music preferences says about you!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
export default HomePage;
