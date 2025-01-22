import { Platform } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number): number => (windowWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number): number => (windowHeight / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5): number => size + (scale(size) - size) * factor;

const isWeb = Platform.OS === "web";
const isIOs = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";
const isMobile = Platform.OS === "android" || Platform.OS === "ios" || windowWidth < 820;

const isSameDay = (d1: Date, d2: Date) =>
	d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

export { isWeb, isIOs, isMobile, isAndroid, scale, verticalScale, moderateScale, windowWidth, windowHeight, isSameDay };
