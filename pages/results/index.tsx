import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";
import AppBar from "../../components/common/AppBar";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import { useParticipants } from "../../hooks/participants/useParticipants";

const ResultsPage = () => {
  const { data, isLoading, isError } = useParticipants();

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
                  <ListItem key={link[idx]}>
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
