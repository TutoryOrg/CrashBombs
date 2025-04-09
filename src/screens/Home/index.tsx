import _ from "lodash";
import { Header } from "@src/components/Header";
import { Counter } from "@src/components/Counter";
import { Buttons } from "@src/components/Buttons";
import { BottomInfo } from "@src/components/BottomInfo";
import { GlobalScore } from "@src/components/GlobalScore";
import type { Session } from "@supabase/supabase-js";
import type { ITopUser, IUser } from "@src/utils/constants";
import { HomeTitle, ViewContainer } from "./styled";
import { useCallback, useEffect, useRef } from "react";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const Home = (props: {
	user: IUser | undefined;
	topUsers: ITopUser[];
	countDown: string;
	setSession: (session: Session) => void;
	onHandleClickPlay: () => void;
}) => {
	const { onHandleClickPlay, user, topUsers, setSession, countDown } = props;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const handleSheetChanges = useCallback((index: number) => { }, []);

	useEffect(() => {
		GoogleSignin.configure({
			iosClientId: "866307489082-r0r0ksb4a9fs1tp6ta3c3htosmk9nln4.apps.googleusercontent.com",
			webClientId: "866307489082-rm2855kl2bnqpvfbie5gf2bjckccrumi.apps.googleusercontent.com",
			profileImageSize: 150,
		});
	});

	return (
		<ViewContainer>
			<Header user={user} bottomSheetModalRef={bottomSheetModalRef} />
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
