import { Stack, Typography } from "@mui/material";
const headerItems = [
  { title: "Home", link: "/dashboard" },
  { title: "Posts", link: "/posts" },
  { title: "About", link: "" },
  { title: "Contact", link: "" },
  { title: "Login", link: "/login" },
];

export const Header = () => {
  const handleRedirect = (link) => {
    window.location.href = link;
  };
  return (
    <Stack display="flex" flexDirection="row" columnGap={20} ml={20}>
      {headerItems.map((item) => (
        <Typography
          variant="h5"
          key={item.title}
          onClick={() => handleRedirect(item.link)}
          sx={{
            cursor: item.link ? "pointer" : "default",
            color: "white",
            "&:hover": {
              textDecoration: item.link ? "underline" : "none",
            },
          }}
        >
          {item.title}
        </Typography>
      ))}
    </Stack>
  );
};
