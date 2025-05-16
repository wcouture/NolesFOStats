import { StyleSheet } from "react-native";

export const boxCardStyle = StyleSheet.create({
  boxBody: {
    height: 200,
    width: 175,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 10,
    margin: 10,
    boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.3)",
  },

  horizontalBox: {
    flexDirection: "row",
    height: 100,
    gap: 20,
    width: "100%",
    marginTop: 15,
  },

  garnetBackground: {
    backgroundColor: "#782f40",
  },

  goldBackground: {
    backgroundColor: "#CEB888",
  },

  cardTitle: {
    fontSize: 28,
    color: "white",
    fontWeight: 700,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "center",
  },

  horizontalTitle: {
    fontSize: 20,
    wordWrap: "wrap",
    maxWidth: "50%",
    paddingLeft: 5,
    paddingRight: 5,
  },

  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  statLabel: {
    color: "white",
    fontFamily: "courier new",
    fontSize: 18,
  },
});

export const detailsStyle = StyleSheet.create({
  safeArea: {
    margin: 50,
  },
  pageTitle: {
    width: "100%",
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 10,
  },
  listHeader: {
    marginTop: 50,
    fontSize: 18,
    textDecorationLine: "underline",
  },
  scrollView: {
    width: "100%",
  },
  listContainer: {
    width: "90%",
  },
  backButton: {
    position: "static",
    bottom: 0,
  },
  backButtonText: {
    fontSize: 20,
    color: "grey",
    width: "100%",
    textAlign: "left",
  },
});

export const toolsStyle = StyleSheet.create({
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: 25,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 700,
    textShadowColor: "#782f40",
    textShadowOffset: { width: 2, height: 2 },
    color: "#ceb888",
  },
});

export default function Styling() {
  throw new Error("Function not implemented.");
}
