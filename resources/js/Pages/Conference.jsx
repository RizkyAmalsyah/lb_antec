import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Conference({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard">
        <style href="/assets/css/main.css"></style>
        <script src="/assets/js/socket.io/socket.io.js"></script>
        <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
        <script src="/assets/js/webrtc.js"></script>
        <script src="/assets/js/main.js"></script>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <label for="roomId">Room ID</label>
            <input id="roomId" type="text" />
            <button id="joinBtn">Join</button>
            <button id="leaveBtn">Leave</button>

            <p id="notification"></p>

            <div id="localVideo-container">
              <video autoplay playsinline muted></video>
            </div>

            <div id="videos">
              <div id="videoGrid" class="grid-container"></div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
