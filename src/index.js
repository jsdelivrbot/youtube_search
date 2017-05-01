//import React library
import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import Heading from "./components/heading";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import "./style.css"
const API_KEY = "AIzaSyCIUIR6zV8y0mxtwcpbyifwpSP1V_ptLr4";



//Create new component. This component should produce some html
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("Learn JavaScript");
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
      //this.setState({videos: videos});
    });
  }
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 400  );
    return (
      <div>
        <Heading />
        <SearchBar onSearchTermChange={videoSearch  } />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})} //this.setState({selectedVideo: selectedVideo})
          videos = {this.state.videos} />
      </div>
    );
  }
}
//Render html from component to DOM.
ReactDOM.render(<App/>, document.querySelector(".container"));
