import React from 'react';
import superagent from 'superagent';
import './form.scss';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: '',
      request: {},
      historyData:[],
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    let url = '';
    let method = '';

    let request = {
      url: this.state.url,
      method: this.state.method,
    };

    if (this.state.url && this.state.method) {
      superagent.get(request.url)
        .then(data => {
          let people = data.body;
          let headers = data.headers;
          localStorage.setItem(`${request.method} in ${request.url}`, JSON.stringify({people,headers}));
          this.props.handler(people, headers);
        });

      this.setState({ request, url, method });
      e.target.reset();
    }

    else {
      alert('there is no url OR methods entry ');
    }
  }

  handleChangeURL = e => {
    const url = e.target.value;
    this.setState({ url });
  };

  handleChangeMethod = e => {
    const method = e.target.id;
    this.setState({ method });
  };

  localstorage = e =>{
    var arr=[];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      console.log('Key: ' + key );  
    arr=this.state.historyData.push(key);
    }
    
    this.setState({arr});

  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' onChange={this.handleChangeURL} />
            <button type="submit">{this.props.title}</button>
          </label>
          <label className="methods">
            <span className={this.state.method === 'get' ? 'active' : ''} id="get" onClick={this.handleChangeMethod}>GET</span>
            <span className={this.state.method === 'post' ? 'active' : ''} id="post" onClick={this.handleChangeMethod}>POST</span>
            <span className={this.state.method === 'put' ? 'active' : ''} id="put" onClick={this.handleChangeMethod}>PUT</span>
            <span className={this.state.method === 'delete' ? 'active' : ''} id="delete" onClick={this.handleChangeMethod}>DELETE</span>
          </label>
        </form>
        <section className="results">
          <span className="method">{this.state.request.method}</span>
          <span className="url">{this.state.request.url}</span>
          <span className="history" onClick={this.localstorage}>History:</span>
          <span className="local">{this.state.historyData}</span>
          {/* <Link to='/api' onClick='hello()'>Here</Link> */}
        </section>
      </>
    );
  }
}

export default Form;