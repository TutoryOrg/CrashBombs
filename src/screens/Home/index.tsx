import { isDefined } from "@src/utils/utils";
import { Fragment, useState } from "react";
import {
	Image,
	RedText,
	BlueText,
	TextUser,
	TextTile,
	LoginText,
	HomeTitle,
	UserStatus,
	ButtonPlay,
	ButtonsText,
	TopFiveText,
	TextTopUser,
	CounterNumber,
	ViewContainer,
	ButtonSettings,
	ScoreContainer,
	HeaderContainer,
	CounterContainer,
	ButtonsContainer,
	TopUsersContainer,
} from "./styled";
import _ from "lodash";
export interface IUser {
	id: number;
	name: string;
}

export const Buttons = () => {
	return (
		<ButtonsContainer>
			<ButtonSettings>
				<ButtonsText>Info</ButtonsText>
			</ButtonSettings>

			<ButtonPlay>
				<ButtonsText>PLAY</ButtonsText>
			</ButtonPlay>
		</ButtonsContainer>
	);
};

export const Counter = (props: { user: IUser | undefined }) => {
	const { user } = props;
	const isLoggedIn = isDefined(user);
	const [counter, setCounter] = useState("182:24:59");

	return (
		<CounterContainer>
			<CounterNumber>{counter}</CounterNumber>
			{!isLoggedIn ? (
				<Fragment>
					<LoginText>
						Log in for a chance to win <RedText>100K</RedText>
					</LoginText>
					<LoginText>
						<BlueText>SING UP</BlueText> or <BlueText>LOG IN</BlueText>
					</LoginText>
				</Fragment>
			) : (
				<Fragment>
					<LoginText>
						Reach the top and claim your <RedText>$100K!</RedText>
					</LoginText>
					<TopFiveText>
						Join the top <RedText>5</RedText> users for a chance to win <BlueText>$1M!</BlueText>
					</TopFiveText>
				</Fragment>
			)}
		</CounterContainer>
	);
};

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

export const Header = (props: { user: IUser | undefined }) => {
	const { user } = props;
	const isLoggedIn = isDefined(user);

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
	const [user] = useState<IUser | undefined>({ id: 201, name: "user_001" });

	return (
		<ViewContainer>
			<Header user={user} />
			<HomeTitle>CRASH BOMBS</HomeTitle>
			<GlobalScore />
			<Counter user={user} />
			<Buttons />
		</ViewContainer>
	);
};
