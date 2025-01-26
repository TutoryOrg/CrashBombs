import { useState } from "react";
import {
	Image,
	TextTile,
	TextUser,
	HomeTitle,
	UserStatus,
	TextTopUser,
	ViewContainer,
	ScoreContainer,
	HeaderContainer,
	TopUsersContainer,
} from "./styled";

export const GlobalScore = () => {
	const [topUsers, setTopUsers] = useState([
		{ id: 1, name: "user_001", score: 100 },
		{ id: 2, name: "user_002", score: 90 },
		{ id: 3, name: "user_003", score: 80 },
		{ id: 4, name: "user_004", score: 70 },
		{ id: 5, name: "user_005", score: 60 },
	]);

	return (
		<ScoreContainer>
			<TextTile>Global Score</TextTile>
			{topUsers.map((user, index) => {
				return (
					<TopUsersContainer key={index} index={index}>
						<TextTopUser>
							{index === 0 ? (
								<Image source={require("assets/star.png")} style={{ height: 12, width: 12 }} />
							) : (
								`#${index + 1}`
							)}
							{`  ${user.name}`}
						</TextTopUser>
						<TextTopUser>{user.score}</TextTopUser>
					</TopUsersContainer>
				);
			})}
		</ScoreContainer>
	);
};

export const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [user, setUser] = useState({ id: 201, name: "user_001" });

	return (
		<HeaderContainer isLoggedIn={isLoggedIn}>
			<UserStatus isLoggedIn={isLoggedIn}>
				<TextUser>#{user?.id}</TextUser>
				<TextUser>{user?.name}</TextUser>
			</UserStatus>
			<Image source={isLoggedIn ? require("assets/loguser.png") : require("assets/user.png")} />
		</HeaderContainer>
	);
};

export const Home = () => {
	return (
		<ViewContainer>
			<Header />
			<HomeTitle>CRASH BOMBS</HomeTitle>
			<GlobalScore />
		</ViewContainer>
	);
};
