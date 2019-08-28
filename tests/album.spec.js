import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
import { getAlbum, getAlbums, getAlbumTracks } from "../src/album";

sinonStubPromise(sinon);
chai.use(sinonChai);
global.fetch = require("node-fetch");

describe("Album", () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, "fetch");
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe("smoke tests", () => {
    it("should have getAlbum method", () => {
      expect(getAlbum).to.exist;
    });

    it("should have getAlbums method", () => {
      expect(getAlbums).to.exist;
    });

    it("should have getAlbumTracks method", () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe("getAlbum", () => {
    it("should call fetch method", () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it("should call fetch with the correct URL", () => {
      const album = getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
      expect(stubedFetch).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy"
      );

      const album2 = getAlbum("4aawyAB9vmqN3uQ7FjRGTk");
      expect(stubedFetch).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk"
      );
    });

    it("should return the correct data from Promise", () => {
      promise.resolves({ album: "name" });
      const album = getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
      expect(album.resolveValue).to.be.eql({ album: "name" });
    });
  });

  describe("getAlbums", () => {
    it("should call fetch method", () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it("should call fetch with the correct URL", () => {
      const albums = getAlbums([
        "4aawyAB9vmqN3uQ7FjRGTy",
        "4aawyAB9vmqN3uQ7FjRGTk"
      ]);
      expect(stubedFetch).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk"
      );

      const albums2 = getAlbums([
        "4aawyAB9vmqN3uQ7FjRGSy",
        "4aawyAB9vmqN3uQ7FjRGDk"
      ]);
      expect(stubedFetch).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGSy,4aawyAB9vmqN3uQ7FjRGDk"
      );
    });

    it("should return the correct data from Promise", () => {
      promise.resolves({ album: "name" });
      const albums = getAlbums([
        "4aawyAB9vmqN3uQ7FjRGTy",
        "4aawyAB9vmqN3uQ7FjRGTk"
      ]);
      expect(albums.resolveValue).to.be.eql({ album: "name" });
    });
  });

  describe("getAlbumTracks", () => {
    it("should call fetch method", () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it("shoul call fetch with the correct URL", () => {
      const tracks = getAlbumTracks("4aawyAB9vmqN3uQ7FjRGTy");
      expect(stubedFetch).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy"
      );

      const tracks2 = getAlbumTracks("4aawyAB9vmqN3uQ7FjRGTk");
      expect(stubedFetch).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk"
      );
    });

    it("should return the correct data from Promise", () => {
      promise.resolves({ album: "name " });
      const tracks = getAlbumTracks("4aawyAB9vmqN3uQ7FjRGTy");
      expect(tracks.resolveValue).to.be.eql({ album: "name " });
    });
  });
});
