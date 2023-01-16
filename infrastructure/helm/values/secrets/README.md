# Useful SOPS commands 
```bash
aws kms describe-key --key-id 'alias/<team_name>-<aws_st_id>-<environment>-cmk' --output text --query 'KeyMetadata.Arn'
```

```bash
sops infrastructure/helm/values/secrets/secrets.svts.yaml
```
