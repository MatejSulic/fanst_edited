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
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDeleteSectionMutation } from "../../../hooks/sections/useSections";
import { SectionType } from "../../../types/section/section";

type Props = {
  section: SectionType;
};

const SectionBlock = ({ section }: Props) => {
  const router = useRouter();
  const { experimentId } = router.query;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const deleteSectionMutation = useDeleteSectionMutation(
    experimentId as string,
    section._id.toString()
  );

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

  const handleSectionDelete = () => {
    deleteSectionMutation.mutate();
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
          title={<Typography variant="subtitle1">{section.title}</Typography>}
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
        <CardContent>
          <Typography variant="body1">{section.description}</Typography>
        </CardContent>
        <CardActions>
          <Link
            href={`/experiments/${experimentId}/sections/${section._id.toString()}`}
          >
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
                    onClick={() => handleSectionDelete()}
                    sx={{ color: (theme) => theme.palette.warning.main }}
                  >
                    <ListItemIcon>
                      <DeleteIcon color="warning" />
                    </ListItemIcon>
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
