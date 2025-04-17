import _ from "lodash";
import { useRef } from "react";
import { Header } from "@src/components/Header";
import { Counter } from "@src/components/Counter";
import { Buttons } from "@src/components/Buttons";
import { BottomInfo } from "@src/components/BottomInfo";
import { GlobalScore } from "@src/components/GlobalScore";
import type { Session } from "@supabase/supabase-js";
import type { ITopUser, IUser } from "@src/utils/constants";
import { HomeTitle, ViewContainer } from "./styled";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";

export const Home = (props: {
	user: IUser | undefined;
	topUsers: ITopUser[];
	countDown: string;
	setSession: (session: Session) => void;
	onHandleClickPlay: () => void;
}) => {
	const { onHandleClickPlay, user, topUsers, setSession, countDown } = props;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	return (
		<ViewContainer>
			<Header user={user} bottomSheetModalRef={bottomSheetModalRef} />
			<HomeTitle>CRASH BOMBS</HomeTitle>
			<GlobalScore topUsers={topUsers} />
			<Counter user={user} count={countDown} bottomSheetModalRef={bottomSheetModalRef} />
			<Buttons bottomSheetModalRef={bottomSheetModalRef} onHandleClickPlay={onHandleClickPlay} />

			<BottomSheetModalProvider>
				<BottomSheetModal ref={bottomSheetModalRef}>
					<BottomSheetView style={{ flex: 1 }}>
						<BottomInfo user={user} setSession={setSession} bottomSheetModalRef={bottomSheetModalRef} />
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</ViewContainer>
	);
};
