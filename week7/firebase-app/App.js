import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from "react-native";

/* ---------------- FIREBASE ---------------- */
const FIREBASE_URL =
  "https://studentdatabase-6138b-default-rtdb.firebaseio.com";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  /* ---------------- STATIC ROOMS ---------------- */
  const rooms = [
    {
      id: 1,
      name: "Baneshwor Room",
      price: "Rs. 8,000",
      desc: "2 BHK | WiFi | Water Included",
      lat: "27.700769",
      lng: "85.300140",
    },
    {
      id: 2,
      name: "Koteshwor Studio",
      price: "Rs. 7,500",
      desc: "Studio | Electricity Included",
      lat: "27.6780",
      lng: "85.3470",
    },
    {
      id: 3,
      name: "New Baneshwor Flat",
      price: "Rs. 10,000",
      desc: "1 BHK | Furnished | Parking",
      lat: "27.6937",
      lng: "85.3420",
    },
  ];

  /* ---------------- SAVE USER ---------------- */
  const saveUser = async () => {
    try {
      await fetch(`${FIREBASE_URL}/users.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: pass,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- SAVE FAVORITE ---------------- */
  const saveFavorite = async (room) => {
    try {
      await fetch(`${FIREBASE_URL}/favorites.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          room: room,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- LOGIN ---------------- */
  if (screen === "login") {
    return (
      <View style={styles.center}>
        <Text style={styles.bigTitle}>🔐 Login</Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          value={user}
          onChangeText={setUser}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={pass}
          onChangeText={setPass}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (user.trim() === "" || pass.trim() === "") {
              Alert.alert("Error", "Please enter username and password");
              return;
            }

            saveUser(); // SAVE TO FIREBASE
            setScreen("home");
          }}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("signup")}>
          <Text style={styles.link}>Create account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- SIGNUP ---------------- */
  if (screen === "signup") {
    return (
      <View style={styles.center}>
        <Text style={styles.bigTitle}>📝 Signup</Text>

        <TextInput placeholder="Username" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => setScreen("login")}
        >
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- DETAILS ---------------- */
  if (screen === "details" && selectedRoom) {
    return (
      <View style={styles.container}>
        <Text style={styles.bigTitle}>{selectedRoom.name}</Text>

        <Text style={styles.price}>{selectedRoom.price}</Text>
        <Text style={styles.text}>{selectedRoom.desc}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setFavorites([...favorites, selectedRoom]);
            saveFavorite(selectedRoom); // SAVE TO FIREBASE
          }}
        >
          <Text style={styles.btnText}>❤️ Add to Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnBlue}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps?q=${selectedRoom.lat},${selectedRoom.lng}`
            )
          }
        >
          <Text style={styles.btnText}>📍 View on Map</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={styles.link}>⬅ Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------------- HOME ---------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏠 Room Finder</Text>

      <ScrollView>
        <Text style={styles.title}>Available Rooms</Text>

        {rooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={styles.card}
            onPress={() => {
              setSelectedRoom(room);
              setScreen("details");
            }}
          >
            <Text style={styles.roomName}>{room.name}</Text>
            <Text style={styles.price}>{room.price}</Text>
            <Text style={styles.small}>{room.desc}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.title}>❤️ Favorites</Text>

        {favorites.length === 0 ? (
          <Text style={styles.small}>No favorites yet</Text>
        ) : (
          favorites.map((room, i) => (
            <View key={i} style={styles.favCard}>
              <Text style={styles.roomName}>{room.name}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => setScreen("login")}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f5f5f5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  bigTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },

  input: {
    width: "90%",
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  btn: {
    backgroundColor: "#2ecc71",
    padding: 14,
    borderRadius: 10,
    width: "90%",
    marginTop: 10,
  },

  btnBlue: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 10,
    width: "90%",
    marginTop: 10,
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  favCard: {
    backgroundColor: "#ffe6e6",
    padding: 14,
    borderRadius: 10,
    marginBottom: 5,
  },

  roomName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    fontSize: 16,
    color: "#27ae60",
  },

  text: {
    fontSize: 16,
    marginVertical: 5,
  },

  small: {
    fontSize: 14,
    color: "#666",
  },

  link: {
    marginTop: 15,
    fontSize: 16,
    color: "#2980b9",
    textAlign: "center",
  },

  logout: {
    backgroundColor: "#e74c3c",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});