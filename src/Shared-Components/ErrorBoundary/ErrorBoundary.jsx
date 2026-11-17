import { Component } from "react";

// Catches any error inside a page/section so a single broken component
// (e.g. an animation library throw) can never blank the entire site.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.warn("Section failed to render:", error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ marginBottom: 20 }}>
            This section could not load. Please try again.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ error: null });
              window.location.reload();
            }}
            style={{
              padding: "10px 22px",
              cursor: "pointer",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#111",
              color: "#fff",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
