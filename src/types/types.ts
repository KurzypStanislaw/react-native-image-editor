import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Edit: { uri: string };
};

export type HomeScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Home"
>;


export type EditingScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Edit"
>;