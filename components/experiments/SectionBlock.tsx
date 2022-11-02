import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SectionBlock = () => {
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
      <Card>
        <CardHeader
          title={<Typography variant="subtitle1">Sekce 1</Typography>}
          action={
            <IconButton
              ref={anchorRef}
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MoreHorizIcon />
            </IconButton>
          }
          className="pb-0"
        />
        <CardContent className="space-y-4">
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante
            ante, eget condimentum sem convallis eget. Sed sed enim ut arcu
            suscipit fermentum. Proin id elementum nisi. Mauris iaculis
            sollicitudin felis, quis viverra orci mollis a. Fusce semper, tellus
            quis posuere rhoncus, ante nulla faucibus nibh, et vestibulum est
            turpis vitae sapien. Nam luctus laoreet aliquam. Quisque justo enim,
            viverra vel ultrices a, vulputate at ligula.
          </Typography>
        </CardContent>
        <CardActions>
          <Link href="/experiments/42/sections/7">
            <Button size="small">Edit Section</Button>
          </Link>
        </CardActions>
      </Card>
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
                  <MenuItem
                    onClick={handleClose}
                    className="text-red-700 flex items-center gap-2"
                  >
                    <DeleteIcon />
                    Delete section
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

export default SectionBlock;
