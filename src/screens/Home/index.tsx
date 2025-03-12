import _ from "lodash";
import { SvgXml } from "react-native-svg";
import { isDefined } from "@src/utils/utils";
import { BottomInfo } from "@src/components/BottomInfo";
import type { Session } from "@supabase/supabase-js";
import { createAvatar } from "@dicebear/core";
import { verticalScale } from "@src/utils/scaleFunctions";
import { avataaarsNeutral } from "@dicebear/collection";
import type { ITopUser, IUser } from "@src/utils/constants";
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

export const Header = (props: { user: IUser | undefined }) => {
	const { user } = props;
	const isLoggedIn = isDefined(user);

	const avatar = createAvatar(avataaarsNeutral, {
		seed: user?.avatar_url,
		radius: verticalScale(45),
	}).toString();

	return (
		<HeaderContainer isLoggedIn={isLoggedIn}>
			<UserStatus isLoggedIn={isLoggedIn}>
				<TextUser># {user?.ranking}</TextUser>
				<TextUser>{`  ${user?.username}`}</TextUser>
			</UserStatus>
			{isLoggedIn ? (
				<SvgXml height={verticalScale(40)} width={verticalScale(40)} xml={avatar} />
			) : (
				<Image height={verticalScale(40)} width={verticalScale(40)} source={require("assets/user.png")} />
			)}
		</HeaderContainer>
	);
};

export const Home = (props: {
	user: IUser | undefined;
	topUsers: ITopUser[];
	countDown: string;
	setSession: (session: Session) => void;
	onHandleClickPlay: () => void;
}) => {
	const { onHandleClickPlay, user, topUsers, setSession, countDown } = props;

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const handleSheetChanges = useCallback((index: number) => {}, []);

	return (
		<ViewContainer>
			<Header user={user} />
			<HomeTitle>CRASH BOMBS</HomeTitle>
			<GlobalScore topUsers={topUsers} />
			<Counter user={user} count={countDown} bottomSheetModalRef={bottomSheetModalRef} />
			<Buttons bottomSheetModalRef={bottomSheetModalRef} onHandleClickPlay={onHandleClickPlay} />

			<BottomSheetModalProvider>
				<BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
					<BottomSheetView style={{ flex: 1 }}>
						<BottomInfo user={user} setSession={setSession} bottomSheetModalRef={bottomSheetModalRef} />
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</ViewContainer>
	);
};
