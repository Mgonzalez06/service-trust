"use client";

import { Stack, Typography } from "@mui/material";
import Link from "next/link";

type HeaderItem = {
  title: string;
  link: string;
};

const headerItems: HeaderItem[] = [
  { title: "My Profile", link: "/profile" },
  { title: "Home", link: "/dashboard" },
  { title: "Posts", link: "/posts" },
  { title: "About", link: "" },
  { title: "Contact", link: "" },
  { title: "Login", link: "/login" },
];

export const Header: React.FC = () => {
  return (
    <Stack display="flex" flexDirection="row" columnGap={4} ml={5}>
      {headerItems.map((item) =>
        item.link ? (
          <Link href={item.link} key={item.title} passHref>
            <Typography
              variant="h6"
              component="a"
              sx={{
                cursor: "pointer",
                color: "white",
                fontWeight: "100",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {item.title}
            </Typography>
          </Link>
        ) : (
          <Typography
            variant="h6"
            key={item.title}
            sx={{
              cursor: "default",
              color: "white",
              fontWeight: "100",
            }}
          >
            {item.title}
          </Typography>
        )
      )}
    </Stack>
  );
};
