import _ from "lodash";
import { isDefined } from "@src/utils/utils";
import { BottomInfo } from "@src/components/BottomInfo";
import { verticalScale } from "@src/utils/scaleFunctions";
import { type Ref, Fragment, useCallback, useRef, useState } from "react";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
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
import type { IUser } from "@src/utils/constants";

export const Buttons = (props: { bottomSheetModalRef: Ref<BottomSheetModal>; onHandleClickPlay: () => void }) => {
	const { bottomSheetModalRef, onHandleClickPlay } = props;

	const handleOpenBottomSheet = () => bottomSheetModalRef?.current?.present();
	const handleCloseBottomSheet = () => bottomSheetModalRef?.current?.dismiss();

	return (
		<ButtonsContainer>
			<ButtonSettings onPress={handleOpenBottomSheet}>
				<ButtonsText>Info</ButtonsText>
			</ButtonSettings>

			<ButtonPlay onPress={onHandleClickPlay}>
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
						Be <Image source={require("assets/star.png")} style={{ height: verticalScale(12), width: verticalScale(12) }} />1
						and claim your <RedText>$100K!</RedText>
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

export const Home = (props: { onHandleClickPlay: () => void }) => {
	const { onHandleClickPlay } = props;
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
			<Buttons bottomSheetModalRef={bottomSheetModalRef} onHandleClickPlay={onHandleClickPlay} />

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
