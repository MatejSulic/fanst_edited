import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import TextTruncate from "react-text-truncate";

const ExperimentListItem = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={<Link href={"/experiments/42"}>Symmetry experiment</Link>}
          secondary={
            <TextTruncate
              textElement="span"
              containerClassName="text-gray-500 text-sm pt-2"
              line={2}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante ante, eget condimentum sem convallis eget. Sed sed enim ut arcu suscipit fermentum. Proin id elementum nisi. Mauris iaculis sollicitudin felis, quis viverra orci mollis a. Fusce semper, tellus quis posuere rhoncus, ante nulla faucibus nibh, et vestibulum est turpis vitae sapien. Nam luctus laoreet aliquam. Quisque justo enim, viverra vel ultrices a, vulputate at ligula. Aliquam fringilla est in nibh bibendum, pretium tempor nisl lacinia. Vivamus tincidunt lacus ut nulla semper, ullamcorper vehicula velit convallis. Integer ex velit, aliquet eget vulputate vitae, congue porta odio. Curabitur sit amet vulputate diam, in bibendum dui."
              }
            />
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            ref={anchorRef}
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreHorizIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        className="z-10"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Preview experiment</MenuItem>
                  <MenuItem onClick={handleClose}>View results</MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="text-red-700 flex items-center gap-2"
                  >
                    <DeleteIcon />
                    Delete
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ExperimentListItem;
