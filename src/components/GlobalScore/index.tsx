import type { ITopUser } from "@src/utils/constants";
import { ScoreContainer, TextTile, TopUsersContainer, TextTopUser } from "./styled";

interface GlobalScoreProps {
    topUsers: ITopUser[]
}
export const GlobalScore: React.FC<GlobalScoreProps> = ({ topUsers }) => {
    return (
        <ScoreContainer>
            <TextTile>Global Score</TextTile>
            {topUsers?.map((user, i) => {
                return (
                    <TopUsersContainer key={i} index={user?.ranking}>
                        <TextTopUser>
                            {Number(user?.ranking) === 1
                                ? "🥇"
                                : Number(user?.ranking) === 2
                                    ? "🥈"
                                    : Number(user?.ranking) === 3
                                        ? "🥉"
                                        : Number(user?.ranking) === 4
                                            ? "4️⃣"
                                            : Number(user?.ranking) === 5
                                                ? "5️⃣"
                                                : Number(user?.ranking)}

                            {`  ${user?.username}`}
                        </TextTopUser>
                        <TextTopUser>{user?.bestscore}</TextTopUser>
                    </TopUsersContainer>
                );
            })}
        </ScoreContainer>
    );
};