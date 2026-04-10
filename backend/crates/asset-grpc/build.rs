fn main() -> Result<(), Box<dyn std::error::Error>> {
    let protoc = protoc_bin_vendored::protoc_bin_path()?;
    std::env::set_var("PROTOC", protoc);
    tonic_build::configure().compile_protos(
        &["../../proto/asset_v1.proto"],
        &["../../proto"],
    )?;
    Ok(())
}
