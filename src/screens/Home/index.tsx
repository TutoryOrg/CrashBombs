import _ from "lodash";
import { isDefined } from "@src/utils/utils";
import { type Ref, Fragment, useCallback, useRef, useState } from "react";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import {
	Image,
	RedText,
	BlueText,
	TextUser,
	TextTile,
	LoginText,
	InfoTitle,
	HomeTitle,
	UserStatus,
	ButtonPlay,
	ButtonsText,
	TopFiveText,
	TextTopUser,
	CounterNumber,
	InfoContainer,
	ViewContainer,
	ButtonSettings,
	ScoreContainer,
	UserInfoContent,
	HeaderContainer,
	CounterContainer,
	ButtonsContainer,
	TopUsersContainer,
	UserInfoContainer,
} from "./styled";
import { fontSizes, type IUser } from "@src/utils/constants";
import { TextObelix } from "@src/components/Text";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { verticalScale } from "@src/utils/scaleFunctions";

enum REGISTER {
	LOG_IN = "LOG_IN",
	SING_UP = "SING_UP",
}

export const BottomInfo = (props: { user: IUser | undefined }) => {
	const { user } = props;
	const isLoggedIn = isDefined(user);
	const [register, setRegister] = useState<REGISTER>(REGISTER.LOG_IN);

	const onRegisterLogIn = () => setRegister(REGISTER.LOG_IN);
	const onRegisterSingUp = () => setRegister(REGISTER.SING_UP);

	const InfoButton = styled.TouchableOpacity`
		width: 100%;
		height: ${verticalScale(44)}px;
		background-color: lightgray;
		align-items: center;
		justify-content: center;
		border-radius: 24px;	
	`;

	const InfoButtonsContainer = styled.View`
		width: 88%;
		height: ${verticalScale(180)}px;
		align-items: center;
		justify-content: space-around;
	`;

	const InfoSubTitle = styled(TextObelix)`

`;

	return (
		<InfoContainer>
			<InfoTitle>Info</InfoTitle>
			<InfoSubTitle>Log In or Sing up to win 100K!</InfoSubTitle>
			{isLoggedIn ? (
				<Fragment>
					<UserInfoContainer>
						<UserInfoContent>
							<BlueText>name: </BlueText>
							<BlueText>Nº ranking: </BlueText>
							<BlueText>Best Score: </BlueText>
							<BlueText>Last Score: </BlueText>
						</UserInfoContent>
						<Image source={require("assets/loguser.png")} style={{ height: 100, width: 100 }} />
					</UserInfoContainer>
				</Fragment>
			) : register === REGISTER.LOG_IN ? (
				<InfoButtonsContainer>
					<InfoButton>
						<Text>Log In with Google</Text>
					</InfoButton>
					<InfoButton>
						<Text>Log In with Facebook</Text>
					</InfoButton>
					<InfoButton>
						<Text>Log In with Apple</Text>
					</InfoButton>

					<TouchableOpacity onPress={onRegisterSingUp}>
						<TextObelix>
							Don't have account?
							<RedText> Sing up.</RedText>
						</TextObelix>
					</TouchableOpacity>
				</InfoButtonsContainer>
			) : (
				<InfoButtonsContainer>
					<InfoButton>
						<Text>Sing Up with Google</Text>
					</InfoButton>
					<InfoButton>
						<Text>Sing Up with Facebook</Text>
					</InfoButton>
					<InfoButton>
						<Text>Sing Up with Apple</Text>
					</InfoButton>
					<TouchableOpacity onPress={onRegisterLogIn}>
						<TextObelix>
							Already have an account? <BlueText>Log in! </BlueText>
						</TextObelix>
					</TouchableOpacity>
				</InfoButtonsContainer>
			)}
			<TextObelix style={{ paddingTop: 20, paddingBottom: 20 }}>
				<TextObelix style={{ fontSize: `${fontSizes.xsmall - 2}` }}>
					Check <BlueText style={{ fontSize: `${fontSizes.xsmall - 2}` }}>www.website.com</BlueText> for more information!
				</TextObelix>
			</TextObelix>
		</InfoContainer>
	);
};

export const Buttons = (props: { bottomSheetModalRef: Ref<BottomSheetModal> }) => {
	const { bottomSheetModalRef } = props;

	const handleOpenBottomSheet = () => bottomSheetModalRef?.current?.present();
	const handleCloseBottomSheet = () => bottomSheetModalRef?.current?.dismiss();

	return (
		<ButtonsContainer>
			<ButtonSettings onPress={handleOpenBottomSheet}>
				<ButtonsText>Info</ButtonsText>
			</ButtonSettings>

			<ButtonPlay onPress={handleCloseBottomSheet}>
				<ButtonsText>PLAY</ButtonsText>
			</ButtonPlay>
		</ButtonsContainer>
	);
};

export const Counter = (props: { user: IUser | undefined; count: string; bottomSheetModalRef: Ref<BottomSheetModal> }) => {
	const { user, count, bottomSheetModalRef } = props;
	const isLoggedIn = isDefined(user);

	const onHandleLogin = () => {
		if (!isLoggedIn) {
			bottomSheetModalRef?.current?.present();
		}
	};

	return (
		<CounterContainer disabled={isLoggedIn} onPress={onHandleLogin}>
			<CounterNumber>{count}</CounterNumber>
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

export const GlobalScore = (props: { topUsers: IUser[] }) => {
	const { topUsers } = props;
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
							{`  ${user?.name}`}
						</TextTopUser>
						<TextTopUser>{user?.score}</TextTopUser>
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
	const [count] = useState("182:24:59");
	// const [user] = useState<IUser | undefined>({ id: 201, name: "user_001", score: 0 });
	const user = undefined;
	const [topUsers] = useState([
		{ id: 1, name: "user_001", score: 100 },
		{ id: 2, name: "user_002", score: 90 },
		{ id: 3, name: "user_003", score: 80 },
		{ id: 4, name: "user_004", score: 70 },
		{ id: 5, name: "user_005", score: 60 },
	]);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
		console.log(bottomSheetModalRef?.current);
	}, []);

	return (
		<ViewContainer>
			<Header user={user} />
			<HomeTitle>CRASH BOMBS</HomeTitle>
			<GlobalScore topUsers={topUsers} />
			<Counter user={user} count={count} bottomSheetModalRef={bottomSheetModalRef} />
			<Buttons bottomSheetModalRef={bottomSheetModalRef} />

			<BottomSheetModalProvider>
				<BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
					<BottomSheetView style={{ flex: 1 }}>
						<BottomInfo user={user} />
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</ViewContainer>
	);
};
