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
	InfoSubTitle,
	InfoButton,
	InfoButtonsContainer,
	InfoButtonText,
} from "./styled";
import { fontSizes, REGISTER, type IUser } from "@src/utils/constants";
import { TextObelix } from "@src/components/Text";
import { TouchableOpacity } from "react-native";
import { verticalScale } from "@src/utils/scaleFunctions";

export const BottomInfo = (props: { user: IUser | undefined }) => {
	const { user } = props;
	const isLoggedIn = isDefined(user);
	const [register, setRegister] = useState<REGISTER>(REGISTER.LOG_IN);

	const onRegisterLogIn = () => setRegister(REGISTER.LOG_IN);
	const onRegisterSingUp = () => setRegister(REGISTER.SING_UP);

	return (
		<InfoContainer isLoggedIn={isLoggedIn}>
			<InfoTitle>Info</InfoTitle>
			{isLoggedIn ? (
				<Fragment>
					<UserInfoContainer>
						<UserInfoContent>
							<BlueText>
								name: <TextObelix>{user?.name}</TextObelix>
							</BlueText>
							<BlueText>
								Nº ranking: <TextObelix>{user?.id}</TextObelix>
							</BlueText>
							<BlueText>
								Best Score: <TextObelix>{user?.bestScore}</TextObelix>
							</BlueText>
							<BlueText>
								Last Score: <TextObelix>{user?.lastScore}</TextObelix>
							</BlueText>
						</UserInfoContent>
						<Image source={require("assets/loguser.png")} style={{ height: 100, width: 100 }} />
					</UserInfoContainer>
				</Fragment>
			) : register === REGISTER.LOG_IN ? (
				<Fragment>
					<InfoSubTitle>
						<TextObelix>Create an account or log in and race to the top to win </TextObelix>
						<RedText>100K!</RedText>
					</InfoSubTitle>
					<InfoButtonsContainer>
						<InfoButton>
							<InfoButtonText>LOG IN WITH GOOGLE</InfoButtonText>
						</InfoButton>
						<InfoButton>
							<InfoButtonText>Log In with Facebook</InfoButtonText>
						</InfoButton>
						<InfoButton>
							<InfoButtonText>Log In with Apple</InfoButtonText>
						</InfoButton>
						<TouchableOpacity
							style={{ height: verticalScale(20), alignContent: "center", justifyContent: "center" }}
							onPress={onRegisterSingUp}
						>
							<TextObelix>
								Don't have account?
								<RedText> Sing up.</RedText>
							</TextObelix>
						</TouchableOpacity>
					</InfoButtonsContainer>
				</Fragment>
			) : (
				<Fragment>
					<InfoSubTitle>
						<TextObelix>Create an account or log in and race to the top to win </TextObelix>
						<RedText>100K!</RedText>
					</InfoSubTitle>
					<InfoButtonsContainer>
						<InfoButton>
							<InfoButtonText>Sing Up with Google</InfoButtonText>
						</InfoButton>
						<InfoButton>
							<InfoButtonText>Sing Up with Facebook</InfoButtonText>
						</InfoButton>
						<InfoButton>
							<InfoButtonText>Sing Up with Apple</InfoButtonText>
						</InfoButton>
						<TouchableOpacity onPress={onRegisterLogIn}>
							<TextObelix>
								Already have an account? <BlueText>Log in! </BlueText>
							</TextObelix>
						</TouchableOpacity>
					</InfoButtonsContainer>
				</Fragment>
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
				<ButtonsText>Play</ButtonsText>
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
						<BlueText>sing up</BlueText> or <BlueText>log in</BlueText>
					</LoginText>
				</Fragment>
			) : (
				<Fragment>
					<LoginText>
						Be <Image source={require("assets/star.png")} style={{ height: 12, width: 12 }} />1 and claim your{" "}
						<RedText>$100K!</RedText>
					</LoginText>
					<TopFiveText>
						Make it to the top <RedText>5</RedText> and you could win <BlueText>$1M!</BlueText>
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
					<TopUsersContainer key={index} index={user?.ranking}>
						<TextTopUser>
							{user?.ranking === 1 ? (
								<Fragment>
									<Image source={require("assets/star.png")} style={{ height: 12, width: 12 }} />
									{user?.ranking}
								</Fragment>
							) : (
								`#${user?.ranking}`
							)}
							{`  ${user?.name}`}
						</TextTopUser>
						<TextTopUser>{user?.bestScore}</TextTopUser>
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
	// const [user] = useState<IUser | undefined>({ id: 201, name: "user_001", ranking: 291, bestScore: 180, lastScore: 99 });
	const user = undefined;
	const [topUsers] = useState([
		{ id: 1, name: "user_001", ranking: 1, bestScore: 100, lastScore: 0 },
		{ id: 2, name: "user_002", ranking: 2, bestScore: 90, lastScore: 0 },
		{ id: 3, name: "user_003", ranking: 3, bestScore: 80, lastScore: 0 },
		{ id: 4, name: "user_004", ranking: 4, bestScore: 70, lastScore: 0 },
		{ id: 5, name: "user_005", ranking: 5, bestScore: 60, lastScore: 0 },
	]);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges - ", index);
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
