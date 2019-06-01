import React from "react";
import moment from "moment";
import { styled } from "theme";
import { UserModel } from "types/models";
import { getLanguage } from "utils";

interface Props {
  user: UserModel;
}

export default ({ user }: Props) => {
  const { creationDate: _creationDate, firstName, lastName, pictureUrl } = user;

  if (!(_creationDate && firstName && lastName && pictureUrl)) return null;

  const creationDate = moment(new Date(_creationDate))
    .locale(getLanguage())
    .format("LL")
    .toLowerCase();

  return (
    <Wrapper>
      <ProfilePicture
        source={{
          uri: pictureUrl
        }}
      />
      <TextWrapper>
        <SectionTitle>
          {user.firstName} {user.lastName}
        </SectionTitle>
        <InfoText>User since {creationDate}</InfoText>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfilePicture = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25;
`;

const TextWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 16px;
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 15px;
`;
