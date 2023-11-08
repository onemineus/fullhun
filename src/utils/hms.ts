import { user } from "@/db/db";
import { HMSActions } from "@100mslive/react-sdk";
import { EventImpl } from "@fullcalendar/core/internal";
export const triggerHms = (
  hmsActions: HMSActions<{
    sessionStore: Record<string, any>;
  }>,
  event: EventImpl
) => {
  const data = {
    name: "title",
    description: "This is a sample description for the room",
    template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID,
  };

  //creating a room via rooms api

  fetch(`${process.env.NEXT_PUBLIC_HMS_URL}rooms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MANAGEMENT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Room created:", data);
      //creating a room code via room code api
      console.log(
        `${process.env.NEXT_PUBLIC_HMS_URL}room-codes/room/${data.id}`
      );
      fetch(`${process.env.NEXT_PUBLIC_HMS_URL}room-codes/room/${data.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MANAGEMENT_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(async (data) => {
          console.log("Response:", data);
          // use room code to fetch auth token
          const authToken = await hmsActions.getAuthTokenByRoomCode({
            roomCode: data.data[1].code,
          });
          try {
            await hmsActions.join({ userName: user.name, authToken });
            console.log("Guest code - " + data.data[0].code);
            console.log(
              "Direct link - " +
                `https://${process.env.NEXT_PUBLIC_TEMPLATE_ID}.app.100ms.live/meeting/${data.data[0].code}`
            );
          } catch (e) {
            console.error(e);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
