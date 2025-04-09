import { Image } from "react-native";
import { Fragment } from "react";
import type { ITopUser } from "@src/utils/constants";
import { ScoreContainer, TextTile, TopUsersContainer, TextTopUser } from "./styled";


export const GlobalScore = (props: { topUsers: ITopUser[] }) => {
    const { topUsers } = props;
    return (
        <ScoreContainer>
            <TextTile>Global Score</TextTile>
            {topUsers?.map((user, index) => {
                return (
                    <TopUsersContainer key={index} index={user?.ranking}>
                        <TextTopUser>
                            {Number(user?.ranking) === 1 ? (
                                <Fragment>
                                    <Image source={require("assets/star.png")} style={{ height: 12, width: 12 }} />
                                    {user?.ranking}
                                </Fragment>
                            ) : (
                                `#${user?.ranking || " - "}`
                            )}
                            {`  ${user?.username}`}
                        </TextTopUser>
                        <TextTopUser>{user?.bestscore}</TextTopUser>
                    </TopUsersContainer>
                );
            })}
        </ScoreContainer>
    );
};