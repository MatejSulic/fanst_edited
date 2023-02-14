import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";
import AppBar from "../../components/common/AppBar";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import { useParticipants } from "../../hooks/participants/useParticipants";

const DashboardPage = () => {
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
                  <ListItem key={link}>
                    <ListItemButton component={Link} href={link}>
                      <ListItemText>
                        Experiment: {item.participantExperiments[idx].title},
                        Participant: {item.participant} ({item.participantEmail}
                        )
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

export default DashboardPage;
