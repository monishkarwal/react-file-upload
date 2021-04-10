import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import CloudUpload from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    margin: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <CloudUpload className={classes.menuIcon} fontSize="large" />
          <Typography variant="h6">File Upload Material</Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
