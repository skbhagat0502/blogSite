import classes from "../css/Loading.module.css";
function Loading() {
  return (
    <div className={classes.loading}>
      <div className={`${classes["spinner-box"]}`}>
        <div className={`${classes["blue-orbit"]} ${classes.leo}`}></div>

        <div className={`${classes["green-orbit"]} ${classes.leo}`}></div>

        <div className={`${classes["red-orbit"]} ${classes.leo}`}></div>

        <div
          className={`${classes["white-orbit"]} ${classes.w1} ${classes.leo}`}
        ></div>
        <div
          className={`${classes["white-orbit"]} ${classes.w2} ${classes.leo}`}
        ></div>
        <div
          className={`${classes["white-orbit"]} ${classes.w3} ${classes.leo}`}
        ></div>
      </div>
    </div>
  );
}
export default Loading;
