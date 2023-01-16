import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import { useParticipants } from "../../hooks/participants/useParticipants";

const ResultsPage = () => {
  const { data, isLoading, isError } = useParticipants();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading || isError) {
    return null;
  }

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <List>
          {data.map((item) => (
            <React.Fragment key={item.participant}>
              {item.links.map((link, idx) => {
                return (
                  <ListItem key={link[idx]} component={Link} href={link[idx]}>
                    <ListItemButton component={Link} href={link[idx]}>
                      <ListItemText>
                        Experiment: {item.participantExperiments[idx].title},
                        Participant: {item.participant}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </React.Fragment>
          ))}
        </List>
      </ContentWrapper>
    </>
  );
};

export default ResultsPage;
