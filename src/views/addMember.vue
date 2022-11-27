<!-- @format -->

<template>
  <nav>
    <v-navigation-drawer v-model="open" class="coll">
      <v-list nav dense class="coll">
        <v-list-item-group class="px-4 mx-2">
          <v-list-item class="list-item py-5 my-5" router to="institution">
            <v-list-item-title>
              <v-icon>mdi-domain</v-icon>
              <button
                @click="institutionLogin"
                class="ps-4 text"
                router
                to="admin"
                style="font-size: 15px"
              >
                Add Member
              </button>
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="list-item pb-5 mb-5" router to="memberView" flat>
						<v-list-item-title router to="memberView">
							<v-icon>mdi-eye </v-icon>
							<button class="ps-4 text"  style="font-size:15px" flat>View Members</button>
						</v-list-item-title>
					</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="" flat>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="open = !open"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="word"
        >SECDOC <span>-{{ orgs.orgName }}</span></v-toolbar-title
      >

       
 

      <v-btn router to="/" icon>
				<v-icon router to="/">mdi-logout</v-icon>
			</v-btn>
    </v-toolbar>
  </nav>

  <v-container class="div-card py-5 my-5">
    <section class="unit-center">
      <form @submit="addmember" class="my-5 py-5">
        <!-- <label class="form-label" for="form4Example1">Full Name</label>
        <div class="form-outline mb-4">
          <input
            class="form-control input-card"
            id="form4Example3"
            rows="4"
            v-model="name"
          />
        </div> -->
        <label class="form-label" for="form4Example3"> Full name</label>
        <div class="form-outline mb-4">
          <input
            class="form-control input-card"
            id="form4Example5"
            rows="4"
            v-model="name"
          />
        </div>
        <label class="form-label" for="form4Example3"> wallet Address</label>
        <div class="form-outline mb-4">
          <input
            class="form-control input-card"
            id="form4Example3"
            rows="4"
            v-model="walletAddress"
          />
        </div>

        <label class="form-label" for="form4Example3">Position</label>
        <div class="form-outline mb-4">
          <input
            class="form-control input-card"
            id="form4Example4"
            rows="4"
            v-model="position"
          />
        </div>

        <div class="unit-center">
          <button
            type="submit"
            class="btn btn-primary btn-block mb-4"
            style="background-color: #04c35c"
          >
            <span class="mx-5 px-5 text-white">ADD</span>
          </button>
        </div>
      </form>
    </section>
  </v-container>
</template>

<script>
import emitter from "tiny-emitter/instance";
import { ethers } from "ethers";
import { abi, contractAddress } from "../../constants";

export default {
  name: "secAdmni",
  data() {
    return {
      open: true,
      group: null,
      walletAddress: "",
      position: "",
      name:"",
      orgs: {},
    };
  },
  components: {},
  methods: {
    async connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else {
        console.log("no wallet connected");
      }
    },

    async addmember(e) {
      e.preventDefault();
      if (!this.walletAddress) {
        alert("insert the name");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      let result = await contract.isAvailable(this.walletAddress);

      if (!result) {
        const name = this.name;
        const walletAddress = this.walletAddress;walletAddress
        const position = this.position;
		const org = this.orgs.orgName;

        try {
          const transactionResponse = await contract.addOperators(
            name,
            org,
            walletAddress,
            position
          );
          // await listenForTransactionMine(transactionResponse, provider);
          console.log("done");
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("account exists in secdoc already");
      }

      this.instname = "";
      this.walletAddress = "";
      this.position = "";
    },

    async institutionLogin() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const orgs = await contract.testingAddress(signer.getAddress());
      return orgs;
    },
   
  },

  async created() {
    emitter.on("orgsData", (evt) => {
      this.orgs = evt.organisation;
    });

    this.orgs = await this.institutionLogin();
  },
};
</script>

<style scoped>
.unit-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.div-card {
  background: #ffffff;
  box-shadow: 0px 4px 0px 7px #cff2fe;
}
.end-pos {
  display: flex;
  justify-content: flex-end;
}
.word {
  color: #095073;
  font-size: large;
}
</style>
